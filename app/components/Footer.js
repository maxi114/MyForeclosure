'use client';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import MyFLogo from '../../public/images/My_1.png';

const Footer = () => {
	return (
		<footer className="bg-tritary py-5">
			<Container>
				<Row>
					<Col lg={6}>
						<Image src={MyFLogo} alt="" className="logo-dark" />
						<p className="text-black text-opacity-50 mt-4">
                            Facing foreclosure can be overwhelming, 
                            <br /> but you don&apos;t have to go through it alone. 
                            <br /> Our platform connects you with experienced 
                            <br /> attorneys who can help you navigate the complexities 
                            <br /> of mortgage and foreclosure regulations.
						</p>

						<ul className="social-list list-inline mt-3">
							<li className="list-inline-item text-center">
								<Link
									href=""
									className="social-list-item border-primary text-primary"
								>
									<i className="mdi mdi-facebook"></i>
								</Link>
							</li>
							<li className="list-inline-item text-center">
								<Link href="" className="social-list-item border-danger text-danger">
									<i className="mdi mdi-google"></i>
								</Link>
							</li>
							<li className="list-inline-item text-center">
								<Link href="" className="social-list-item border-info text-info">
									<i className="mdi mdi-twitter"></i>
								</Link>
							</li>
							<li className="list-inline-item text-center">
								<Link
									href=""
									className="social-list-item border-secondary text-secondary"
								>
									<i className="mdi mdi-github"></i>
								</Link>
							</li>
						</ul>
					</Col>
					<Col lg={2} md={4} className="mt-3 mt-lg-0">
						<h5 className="text-black">Company</h5>

						<ul className="list-unstyled ps-0 mb-0 mt-3">
							<li className="mt-2">
								<Link href="" className="text-black text-opacity-50">
									About Us
								</Link>
							</li>
							<li className="mt-2">
								<Link href="" className="text-black text-opacity-50">
									Documentation
								</Link>
							</li>
							<li className="mt-2">
								<Link href="" className="text-black text-opacity-50">
									Blog
								</Link>
							</li>
						</ul>
					</Col>
					<Col lg={2} md={4} className="mt-3 mt-lg-0">
						<h5 className="text-black">Apps</h5>

						<ul className="list-unstyled ps-0 mb-0 mt-3">
							<li className="mt-2">
								<Link href="" className="text-black text-opacity-50">
									Property Listings
								</Link>
							</li>
							<li className="mt-2">
								<Link href="" className="text-black text-opacity-50">
									Lead Generation
								</Link>
							</li>
							<li className="mt-2">
								<Link href="" className="text-black text-opacity-50">
									Education
								</Link>
							</li>
							<li className="mt-2">
								<Link href="" className="text-black text-opacity-50">
									AI Cold Calling
								</Link>
							</li>
							<li className="mt-2">
								<Link href="" className="text-black text-opacity-50">
									CRM - Attorney Dashboard
								</Link>
							</li>
						</ul>
					</Col>
					<Col lg={2} md={4} className="mt-3 mt-lg-0">
						<h5 className="text-black">Discover</h5>
						<ul className="list-unstyled ps-0 mb-0 mt-3">
							<li className="mt-2">
								<Link href="" className="text-black text-opacity-50">
									Help Center
								</Link>
							</li>
							<li className="mt-2">
								<Link href="" className="text-black text-opacity-50">
									Our Products
								</Link>
							</li>
							<li className="mt-2">
								<Link href="" className="text-black text-opacity-50" >
									Privacy
								</Link>
							</li>
						</ul>
					</Col>
				</Row>
				<Row>
					<Col lg={12}>
						<div className="mt-5">
							<p className="text-black text-opacity-50 mt-4 text-center mb-0">
								© 2022 - {new Date().getFullYear()} MyForeClosure LLC.
							</p>
						</div>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
