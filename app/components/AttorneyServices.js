'use client';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import { attorneyservices } from './data';

const AttorneyServices = () => {
	return (
		<section className="py-5">
			<Container>
				<Row className="py-4">
					<Col lg={12}>
						<div className="text-center">
							<h1 className="mt-0">
								<i className="mdi mdi-infinity"></i>
							</h1>
							<h3>
                                Prevent foreclosure and <span className="text-primary">secure </span>
								your home with <br />
                                <span className="text-primary">expert </span> assistance tailored to your needs.
							</h3>
							<p className="text-muted mt-2">
                                Navigate financial hardships with confidence and find the support you deserve.
								<br />
								Step-by-step guidance through the foreclosure prevention and recovery process.
							</p>
						</div>
					</Col>
				</Row>

				<Row>
					{attorneyservices.map((feature, index) => (
						<Col lg={4} md={6} key={index}>
							<div className="text-center p-2 p-sm-3">
								<div className="avatar-sm m-auto">
									<span className="avatar-title bg-primary-lighten rounded-circle">
										<i
											className={classNames(
												'text-primary',
												'font-24',
												feature.icon
											)}
										></i>
									</span>
								</div>
								<h4 className="mt-3">{feature.title}</h4>
								<p className="text-muted mt-2 mb-0">{feature.description}</p>
							</div>
						</Col>
					))}
				</Row>
			</Container>
		</section>
	);
};

export default AttorneyServices;
