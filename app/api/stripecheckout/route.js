import { NextResponse } from 'next/server'
import Stripe from 'stripe'

//functiont to set the subscription charge
const formatAmountForStripe = (amount, currency) => {
    return Math.round(amount * 100)
   }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})


//function to implement the stripe checkout
export async function POST(req) {
  try {
    // implementation of the stripe checkout
    const params = {
        mode: 'subscription', // set mode to subscription for recurring payments
        payment_method_types: ['card'], //accept card payments
        line_items: [
          {
            //set the subscription price
            price_data: {
              currency: 'usd', 
              product_data: {
                name: 'Pro subscription', //name of the product is pro subscription
              },
              unit_amount: formatAmountForStripe(10, 'usd'), // $10.00
              //set the subscription to monthly
              recurring: {
                interval: 'month',
                interval_count: 1,//charge the customers card once
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.get(
          'Referer',
        )}result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get(
          'Referer',
        )}result?session_id={CHECKOUT_SESSION_ID}`,
      }
      
      //send the above configuration to stripe and await response
      const checkoutSession = await stripe.checkout.sessions.create(params)
      
      //return a json document from stripe
      return NextResponse.json(checkoutSession, {
        status: 200,
      })

  } catch (error) {//catch any errors
    console.error('Error creating checkout session:', error)
    //retrun the error message 
    return new NextResponse(JSON.stringify({ error: { message: error.message } }), {
      status: 500,
    })
  }
}


//get route for retrieving session details
export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const session_id = searchParams.get('session_id') //get the sessions ID
  
    try {

        //if no session Id is provided throw an error
      if (!session_id) {
        throw new Error('Session ID is required')
      }
  
      //use the stripe API to retrieve he checkout session details.
      const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
  
      return NextResponse.json(checkoutSession) //return the session details as a JSON response
    } catch (error) {
      console.error('Error retrieving checkout session:', error)
      return NextResponse.json({ error: { message: error.message } }, { status: 500 })//return status 500 if an error occurs
    }
  }