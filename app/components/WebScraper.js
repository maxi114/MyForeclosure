'use client';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';

const WebScraper = () => {
  const [scrapingStatus, setScrapingStatus] = useState('idle');
  const [scrapedData, setScrapedData] = useState(null);

  const startScraping = async () => {
    setScrapingStatus('scraping');
    try {
      const response = await axios.post('/api/scrape');
      setScrapedData(response.data);
      setScrapingStatus('completed');
    } catch (error) {
      console.error('Scraping failed:', error);
      setScrapingStatus('failed');
    }
  };

  return (
    <div>
      <h2>Auction Data Scraper</h2>
      <button onClick={startScraping} disabled={scrapingStatus === 'scraping'}>
        {scrapingStatus === 'scraping' ? 'Scraping...' : 'Start Scraping'}
      </button>
      {scrapingStatus === 'completed' && (
        <div>
          <h3>Scraped Data:</h3>
          <pre>{JSON.stringify(scrapedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default WebScraper;