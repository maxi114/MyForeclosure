"use client";
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import FFlogo from '../../public/images/My_1.png';



const NavBar = () => {
  
  return (
    <Navbar collapseOnSelect expand="lg" variant="light" className="py-lg-3 navbar-light">
      <Container>
        <Link href="/" className="me-lg-5 navbar-brand">
          <Image src={FFlogo} alt="Logo" className="logo-dark" height={40} />
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-toggler">
          <i className="mdi mdi-menu"></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav as="ul" className="me-auto align-items-center navbar-nav">
            <Nav.Item as="li" className="mx-lg-1">
              <Link href="/" className="nav-link active">Home</Link>
            </Nav.Item>
            <Nav.Item className="mx-lg-1">
              <Link href="/attorney/firms" className="nav-link active">Attorney</Link>
            </Nav.Item>
            {/* <Nav.Item className="mx-lg-1">
              <Link href="#pricing-landing" className="nav-link">Pricing</Link>
            </Nav.Item> */}
            {/* <Nav.Item className="mx-lg-1">
              <Link href="#faq-landing" className="nav-link">FAQs</Link>
            </Nav.Item> */}
            {/* <Nav.Item className="mx-lg-1">
              <Link href="#contact-us-landing" className="nav-link">Contact</Link>
            </Nav.Item> */}
          </Nav>

          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-0">
              {/* <a
                href="https://themes.getbootstrap.com/product/hyper-react-admin-dashboard-template/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link d-lg-none"
              >
                Sign Up
              </a> */}
              <a
                href="/account/login"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-primary rounded-pill d-none d-lg-inline-flex"
              >
                <i className="mdi mdi-account me-2" /> Login
              </a>
              
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;