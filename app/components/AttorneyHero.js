"use client";
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import image1 from '../../public/images/7.png';

const AttorneyHero = () => {
	return (
		<section className="hero-section">
			<Container>
				<Row className="align-items-center">
					<Col md={5}>
						<div className="mt-md-4">
							<div>
								
								<span className="text-black-50 ms-1">
									Welcome to MyForeclosure
								</span>
							</div>
							<h2 className="text-black fw-normal mb-4 mt-3 hero-title">
								Unlock New Revenue Streams with AI-Driven Legal Solutions
							</h2>

							<p className="mb-4 font-16 text-black-50">
								Grow your practice by helping homeowners recover from foreclosure. Our platform offers the most advanced AI tools to streamline your workflow and increase your client base.
							</p>

							<div className="d-flex gap-1">
								<Link
									href="/account/register"
									target="_blank"
									className="btn btn-lg font-16 btn-success"
								>
									Sign Up
									<i className="mdi mdi-arrow-right ms-1" />
								</Link>
								<Link href="" target="_blank" className="btn btn-lg font-16 btn-info">
									Check Demos
								</Link>
							</div>
						</div>
					</Col>
					<Col md={{ span: 5, offset: 2 }}>
						<div className="text-md-end mt-3 mt-md-0">
							<Image src={image1} alt="" className="w-100 h-auto" />
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default AttorneyHero;