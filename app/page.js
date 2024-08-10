
import dynamic from 'next/dynamic';
// import Hero from './components/Hero';
// import Services from './components/Services';
// import Layouts from './components/Layouts';
// import Features from './components/Features';
// import Pricing from './components/Pricing';
// import FAQ from './components/FAQ';
// import ContactUs from './components/ContactUs';
// import Footer from './components/Footer';
const NavBar = dynamic(() => import('./components/NavBar'), { ssr: false });
const Hero = dynamic(() => import('./components/Hero'), { ssr: false });
// const Services = dynamic(() => import('./components/Services'), { ssr: false });
// const Layouts = dynamic(() => import('./components/Layouts'), { ssr: false });
// const Features = dynamic(() => import('./components/Features'), { ssr: false });
// const Pricing = dynamic(() => import('./components/Pricing'), { ssr: false });
// const FAQ = dynamic(() => import('./components/FAQ'), { ssr: false });
// const ContactUs = dynamic(() => import('./components/ContactUs'), { ssr: false });
// const Footer = dynamic(() => import('./components/Footer'), { ssr: false });



export default function Home() {
  return (
    <>
      <NavBar />
      {/* <Hero /> */}
      {/* <Services />
      <Layouts />
      <Features />
      <Pricing />
      <FAQ />
      <ContactUs />
      <Footer /> */}
    </>
    
  );
}
