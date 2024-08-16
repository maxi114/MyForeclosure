
import dynamic from 'next/dynamic';
import React from 'react';

const NavBar = dynamic(() => import('./components/NavBar'), { ssr: false });
const Hero = dynamic(() => import('./components/Hero'), { ssr: false });
const Services = dynamic(() => import('./components/Services'), { ssr: false });
// const Layouts = dynamic(() => import('./components/Layouts'), { ssr: false });
// const Features = dynamic(() => import('./components/Features'), { ssr: false });
// const Pricing = dynamic(() => import('./components/Pricing'), { ssr: false });
// const FAQ = dynamic(() => import('./components/FAQ'), { ssr: false });
// const ContactUs = dynamic(() => import('./components/ContactUs'), { ssr: false });
const Footer = dynamic(() => import('./components/Footer'), { ssr: false });
import Popupp from './components/chat/popup';

export default function page() {
  return (
    <>
      <NavBar />
      <Hero />
      <Services />
      {/* <Layouts /> */}
      {/* <Features /> */}
      {/* <Pricing /> */}
      {/* <FAQ /> */}
      {/* <ContactUs /> */}
      <Footer />
      <Popupp/>
    </>
  );
}
