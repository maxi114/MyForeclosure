import { Row, Col, Container } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import Img from '../../../public/images/svg/maintenance.svg';

const maintenanceQuery = [
  {
    icon: 'ri-vip-diamond-line ',
    title: 'Why is the Site Down?',
    desc: 'Our dashboard is currently under development as we prepare for our upcoming soft launch. We are making sure everything is perfect for you!',
  },
  {
    icon: 'ri-time-line',
    title: 'What is the Downtime?',
    desc: 'While we are working behind the scenes, feel free to explore the rest of our site. Check out our home page for more information and updates.',
  },
  {
    icon: 'ri-question-mark',
    title: 'Do you need Support?',
    desc: "If you have any questions or need assistance, please contact our team at support@myforeclosure.com.",
  },
];

export default function MaintenancePage() {
  return (
    <>
      <div className="mt-5 mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col xl={10}>
              <div className="text-center">
                <Image src={Img} height={140} width={140} alt="Maintenance" />
                <h3 className="mt-4">Site is Under Maintenance</h3>
                <p className="text-muted">
                    We're working on something exciting! Please check back soon.
                </p>

                <Row className="mt-5">
                  {maintenanceQuery.map((item, index) => (
                    <Col key={index} md={4}>
                      <div className="text-center mt-3 ps-1 pe-1">
                        <i
                          className={classNames(
                            'bg-primary',
                            'maintenance-icon',
                            'text-white',
                            'mb-4',
                            item.icon
                          )}
                        ></i>
                        <h5 className="text-uppercase">{item.title}</h5>
                        <p className="text-muted">{item.desc}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <footer className="footer footer-alt">
        {new Date().getFullYear()} ©
        <Link href="/" target="_blank" className="">
             MyForeclosure.org
        </Link>
      </footer>
    </>
  );
}