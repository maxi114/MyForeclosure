import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chrome from '@sparticuz/chromium';

export async function POST() {
  try {
    const { results, auctionData } = await scrapeAuctionData('https://miamidade.realforeclose.com/index.cfm?resetcfcobjs=1');
    
    // Process data
    const currentDate = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const csvContentAuctionData = processAuctionData(auctionData);
    const csvDataAllResults = processAllResults(results);

    return NextResponse.json({
      success: true,
      data: {
        results,
        auctionData,
        csvContentAuctionData,
        csvDataAllResults
      }
    });
  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json({ success: false, error: 'Scraping failed' }, { status: 500 });
  }
}

// Include the scrapeAuctionData function here
const scrapeAuctionData = async (url) => {
  // Copy the function from the original script (lines 5-162)
  const browser = await puppeteer.launch({
    args: chrome.args,
    defaultViewport: chrome.defaultViewport,
    executablePath: await chrome.executablePath,
    headless: true,
  });  
  const page = await browser.newPage();
  
  try {
    // Navigate to the county foreclosure portal
    await page.goto(url);
    // Wait for the login form to load
    await page.waitForSelector('#DivLogForm');
    // Fill in the login credentials
    await page.type('#LogName.LogInput', 'Jpfortunefinder', { delay: 100 });
    await page.type('#LogPass.LogInput', 'Boson#022394', { delay: 100 });
    // Click the Submit button
    await page.click('#LogButton');
      try {
        // Wait for Notice Update to load
        await page.waitForSelector('#FRM_DOC.FRAMECFC.FIXEDWIDTHCONTENT, .FIXEDWIDTHCONTENT.calDiv', { visible: true });
        // Loop to click the OK button until it's no longer clickable
        let okButtonFound = true;
          while (okButtonFound) {
            try {
              // Search for selector on webpage
              const okButton = '#BNOTACC';
              // Wait for the OK button to be visible and clickable
              await page.waitForSelector(okButton, { visible: true, timeout: 1000 });
              // Click the OK button
              await page.click(okButton, { timeout: 1000 });
              // Introduce a delay between clicks (1 second in this example)
              await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
              // If the OK button is no longer clickable, exit the loop
              okButtonFound = false;
            }
          }
        // Loop to click the OK button until it's no longer clickable
        let confirmButtonFound = true;
        while (confirmButtonFound) {
          try {
            // Search for selector on webpage
            const confirmButton = '#BNOTOK';
            // Wait for the OK button to be visible and clickable
            await page.waitForSelector(confirmButton, { visible: true, timeout: 1000 });
            // Click the OK button
            await page.click(confirmButton, { timeout: 1000 });
            // Introduce a delay between clicks (1 second in this example)
            await new Promise(resolve => setTimeout(resolve, 1000));
          } catch (error) {
            // If the OK button is no longer clickable, exit the loop
            confirmButtonFound = false;
          }
        }
      } catch (error){
        console.log("Proceeding to Auction Calendar");
      }
      // Code for scraping auction data:
      // Goes to the Bid Menu Section and clicks the calendar link
      try { 
        await page.click('.LN_MI');
        //Wait for Calendar page to load
        await page.waitForSelector('#MAIN_TBL_CONTENT', {visible: true, timeout: 3000});    
        await page.waitForSelector('.CALDAYBOX', {visible: true, timeout: 3000});       
        // Get the current date in mm/dd/yyyy format
        //const currentDate = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
        //Click the day link on auction calendar
        await page.click(`.CALBOX.CALW5.CALSELF[dayid="09/10/2024"]`, { visible: true });// UsingHTML attributes [dayid="mm/dd/yyyy"]
        //Takes a screenshot of the website
        // await page.waitForSelector('div.Head_C', {visible: true, timeout: 3000 });
        // await page.screenshot({path: 'AuctionList.png',  width: 1600, height: 4000});    
        // //Create a PDF of content on website
        // await page.waitForSelector('#MAIN_TBL_CONTENT', {visible: true, timeout: 3000});
        // await page.pdf({path: 'AuctionList.pdf', format: 'A4'});

      } catch(error) {
        console.log('No Auction Today', error);
      };

      // This closure will loop through a page grabbing specific selctors and loop through each element to scrape certain properties such as auction details , push the result to an empty data array and console.log all the results
      const results = await page.evaluate(() => {
        const data = [];
        // Adjust this selector based on actual HTML structure
        const items = document.querySelectorAll('#Area_C.Auct_Area .AUCTION_ITEM'); 
        items.forEach(item => {
          const details = item.querySelectorAll('div.AUCTION_DETAILS .AD_DTA');
          const auctionType = details[0]?.innerText.trim();
          const result = {};
          if (auctionType === "FORECLOSURE") {
            result.AuctionSold = item.querySelector('div.AUCTION_STATS .ASTAT_MSGB.Astat_DATA')?.innerText.trim() || "No Data",
            result.Amount = item.querySelector('div.AUCTION_STATS .ASTAT_MSGD.Astat_DATA')?.innerText.trim() || "Canceled",
            result.SoldTo = item.querySelector('div.AUCTION_STATS .ASTAT_MSG_SOLDTO_MSG.Astat_DATA')?.innerText.trim() || "Not Sold",               
            result.AuctionType = auctionType || "No Data",
            result.CaseNumber = details[1]?.innerText.trim() || "No Data",
            result.FinalJudgmentAmount = details[2]?.innerText.trim() || "No Data",
            result.ParcelID = details[3]?.innerText.trim() || "No Data",
            result.PropertyAddress = details[4]?.innerText.trim() || "No Data",
            result.PropertyCity = details[5]?.innerText.trim() || "No Data",
            result.AssessedValue = details[6]?.innerText.trim() || "No Data",
            result.PlaintiffMaxBid = details[7]?.innerText.trim() || "No Data"
          } else if (auctionType === "TAXDEED") {
            result.AuctionSold = item.querySelector('div.AUCTION_STATS .ASTAT_MSGB.Astat_DATA')?.innerText.trim() || "No Data",
            result.Amount = item.querySelector('div.AUCTION_STATS .ASTAT_MSGD.Astat_DATA')?.innerText.trim() || "Canceled",
            result.SoldTo = item.querySelector('div.AUCTION_STATS .ASTAT_MSG_SOLDTO_MSG.Astat_DATA')?.innerText.trim() || "Not Sold",               
            result.AuctionType = auctionType || "No Data",
            result.CaseNumber = details[1]?.innerText.trim() || "No Data",
            result.CertificateNumber = details[2]?.innerText.trim() || "No Data"
            result.FinalJudgmentAmount = details[3]?.innerText.trim() || "No Data",
            result.ParcelID = details[4]?.innerText.trim() || "No Data",
            result.PropertyAddress = details[5]?.innerText.trim() || "No Data",
            result.PropertyCity = details[6]?.innerText.trim() || "No Data",
            result.AssessedValue = details[7]?.innerText.trim() || "No Data"
          }
          data.push(result);
        });
        return data;
      }); 
      console.log("Auction Results:", results);
      // Script to extract/scrape parties involved
      const auctionAreas = await page.$$eval("#Area_C.Auct_Area .AD_DTA a", anchors => anchors.map(a => a.href));
      let auctionData = [];
      for (const auctionAreaUrl of auctionAreas) {
        // Navigate to auction area URL
        await page.goto(auctionAreaUrl); 
        // Ensure the page has loaded
        await page.waitForSelector('#MAIN_TBL_CONTENT', {visible: true, timeout: 3000});
        // Ensure the page has loaded
        await page.waitForSelector('#FRM_ADetails', {visible: true, timeout: 3000}); 
        // Take full-page screenshot with a timestamp
        // await page.pdf({path: `./screenshots/screenshot_${Date.now()}_${url.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`, fullPage: true});
        // Extract data for each auction item
        const defendantsData = await page.evaluate(() => {
          const data = [];
          // Adjust selector based on your HTML structure
          const items = document.querySelectorAll('.mggrid '); 
          items.forEach(item => {
            const caseNumber = document.querySelectorAll('#AIC_PARENT .bdTab .bDat');
            const defendants = item.querySelectorAll('.bDiv .mgtt'); // Adjust selector based on your HTML structure
            defendants.forEach(defendant => {
              const result = {
                // Extract defendant's name and reference by case#
                CaseNumber: caseNumber[0]?.innerText.trim() || 'No Case Number',
                PartiesInvolved: defendant.innerText.trim().replace(/[\t\n\r]\n/g, '') || 'No Parties' 
              };
              data.push(result);
            });
          });
          return data;
        });
        console.log("Claimants Data:", defendantsData);
        // Append the scraped data to the array
        auctionData = [...auctionData, ...defendantsData];
      };
    // Close the browser
    await browser.close();
    // Return the results and auctionData
    return { results, auctionData };
  } catch (error) {
    console.error('Error occurred:', error);
    await browser.close();
  }
};

// Include the data processing functions here
const processAuctionData = (auctionData) => {
  const header = 'CaseNumber, PartiesInvolved';
  return `${header}\n` + auctionData.map(item => `"${item.CaseNumber}", "${item.PartiesInvolved}"`).join('\n');
};

const processAllResults = (results) => {
  const header = 'AuctionSold,Amount,SoldTo,AuctionType,CaseNumber,FinalJudgmentAmount,ParcelID,PropertyAddress,PropertyCity,AssessedValue';
  return `${header}\n` + results.map(item => {
    const { PropertyCity, Amount, FinalJudgmentAmount, AssessedValue } = item;
    const [city, zipCode] = PropertyCity.includes(',') ? PropertyCity.split(',').map(s => s.trim()) : [PropertyCity.trim(), ''];
    const formatAmount = (amount) => amount.split(',').map(part => part.trim()).join(' ');
    return `"${item.AuctionSold}","${formatAmount(Amount)}","${item.SoldTo}","${item.AuctionType}","${item.CaseNumber}","${formatAmount(FinalJudgmentAmount)}","${item.ParcelID}","${item.PropertyAddress}","${city} ${zipCode}","${formatAmount(AssessedValue)}"`;
  }).join('\n');
};