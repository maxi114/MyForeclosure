"use client";
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import image1 from '../../public/images/svg/startup.svg';

const Hero = () => {
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
								Let us help you through this process
							</h2>

							<p className="mb-4 font-16 text-black-50">
								Helping individuals navigate foreclosure - providing access to transparent guidance like never before.
							</p>

							<div className="d-flex gap-1">
								<Link
									href=""
									target="_blank"
									className="btn btn-lg font-16 btn-success"
								>
									Get Free Trial
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
							<Image src={image1} alt="" className="img-fluid" />
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Hero;