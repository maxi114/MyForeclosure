import layout1 from '../../public/images/layouts/layout-1.png';
import layout2 from '../../public/images/layouts/layout-2.png';
import layout3 from '../../public/images/layouts/layout-3.png';
import layout4 from '../../public/images/layouts/layout-4.png';
import layout5 from '../../public/images/layouts/layout-5.png';
import layout6 from '../../public/images/layouts/layout-6.png';
import image1 from '../../public/images/svg/features-1.svg';
import image2 from '../../public/images/svg/features-2.svg';

const services = [
  {
    icon: 'ri ri-openai-fill',
    title: 'AI-Powered Customer Support',
    description:
      'Get instant answers to your questions with our AI-powered customer support, available 24/7. Whether you need help navigating the platform or understanding your options, our intelligent assistant is here to guide you every step of the way.',
  },
  {
    icon: 'ri ri-briefcase-5-fill',
    title: 'Expert Legal Consultation',
    description:
      'Connect with experienced real estate attorneys who specialize in foreclosure prevention and recovery. Our platform ensures you receive personalized legal advice tailored to your unique situation.',
  },
  {
    icon: 'ri ri-shield-user-fill',
    title: 'Secure Document Management',
    description:
      'Easily upload, track, and manage all your important documents with our secure document management system. Keep everything organized and accessible in one place, ensuring you never miss a critical deadline.',
  }
];

const attorneyservices = [
  {
    icon: 'ri ri-openai-fill',
    title: 'AI-Powered Client Acquisition',
    description:
      'Automatically identify and connect with high-potential clients using our AI-driven lead generation, tailored specifically for foreclosure cases.',
  },
  {
    icon: 'ri ri-briefcase-5-fill',
    title: 'Smart Contracts with OpenLaw',
    description:
      'Integrate cutting-edge smart contracts into your legal practice, making your transactions faster, more secure, and transparent.',
  },
  {
    icon: 'ri ri-shield-user-fill',
    title: 'Advanced Data Scraping',
    description:
      'Stay ahead with real-time county auction data scraping, providing you with the latest information on surplus funds and potential leads.',
  }
];

const layouts = [
  {
    image: layout1,
    layout: 'Vertical Layout',
  },
  {
    image: layout2,
    layout: 'Horizontal Layout',
  },
  {
    image: layout3,
    layout: 'Detached Layout',
  },
  {
    image: layout5,
    layout: 'Light Sidenav Layout',
  },
  {
    image: layout6,
    layout: 'Boxed Layout',
  },
  {
    image: layout4,
    layout: 'Semi Dark Layout',
  },
];

const features = [
  {
    id: 1,
    title: 'Inbuilt applications and pages',
    desc: 'Hyper comes with a variety of ready-to-use applications and pages that help to speed up the development',
    image: image1,
    features: [
      'Projects & Tasks',
      'Ecommerce Application Pages',
      'Profile, pricing, invoice',
      'Login, signup, forget password',
    ],
  },
  {
    id: 2,
    title: 'Simply beautiful design',
    desc: 'The simplest and fastest way to build dashboard or admin panel. Hyper is built using the latest tech and tools and provide an easy way to customize anything, including an overall color schemes, layout, etc.',
    image: image2,
    features: [
      'Built with latest Bootstrap',
      'Extensive use of SCSS variables',
      ' Well documented and structured code',
      'Detailed Documentation',
    ],
  },
];

const plans = [
  {
    id: 1,
    name: 'Standard License',
    icon: 'ri-user-line',
    price: '$49',
    duration: 'License',
    features: [
      '10 GB Storage',
      '500 GB Bandwidth',
      'No Domain',
      '1 User',
      'Email Support',
      '24x7 Support',
    ],
    isRecommended: false,
  },
  {
    id: 2,
    name: 'Multiple License',
    icon: 'ri-briefcase-line',
    price: '$99',
    duration: 'License',
    features: [
      '50 GB Storage',
      '900 GB Bandwidth',
      '2 Domain',
      '10 User',
      'Email Support',
      '24x7 Support',
    ],
    isRecommended: true,
  },
  {
    id: 3,
    name: 'Extended License',
    icon: 'ri-store-2-line',
    price: '$599',
    duration: 'License',
    features: [
      '100 GB Storage',
      'Unlimited Bandwidth',
      '10 Domain',
      'Unlimited Users',
      'Email Support',
      '24x7 Support',
    ],
    isRecommended: false,
  },
];

const rawFaqs = [
  {
    id: 1,
    question: 'Can I use this template for my client?',
    answer: 'Yup, the marketplace license allows you to use this theme in any end products. For more information on licenses, please refere here.',
    titleClass: 'text-body',
    textClass: 'pb-1 text-muted',
  },
  {
    id: 2,
    question: 'Can this theme work with Wordpress?',
    answer: "No. This is a HTML template. It won't directly with wordpress, though you can convert this into wordpress compatible theme.",
    titleClass: 'text-body',
    textClass: 'pb-1 text-muted',
  },
  {
    id: 3,
    question: 'How do I get help with the theme?',
    answer: 'Use our dedicated support email (support@coderthemes.com) to send your issues or feedback. We are here to help anytime.',
    titleClass: 'text-body',
    textClass: 'pb-1 text-muted',
  },
  {
    id: 4,
    question: 'Will you regularly give updates of Hyper?',
    answer: 'Yes, We will update the Hyper regularly. All the future updates would be available without any cost.',
    titleClass: 'text-body',
    textClass: 'pb-1 text-muted',
  },
];

export { attorneyservices, services, layouts, features, plans, rawFaqs };
