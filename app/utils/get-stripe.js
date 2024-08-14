//this page allows us to communicate with stripe from the client side
import { loadStripe } from '@stripe/stripe-js' 

let stripePromise 

//this function only allows for one instance of stripe to be created and reusing t if it already exists
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

export default getStripe