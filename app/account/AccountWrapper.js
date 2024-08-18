'use client';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import BGCircles from '../elements/BGCircles';
import Logo from '../../public/images/My_1.png';

export default function AccountWrapper({ bottomLinks, children }) {
    return (
        <>
            <BGCircles />
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} xxl={4}>
                            <Card>
                                <Card.Header className="pt-4 pb-4 text-center bg-tritary">
                                    <Link href="/">
                                        <span>
                                            <Image src={Logo} alt="Logo" height={40} />
                                        </span>
                                    </Link>
                                </Card.Header>
                                <main>
                                    <Card.Body className="p-4">{children}</Card.Body>
                                </main>
                            </Card>
                            {bottomLinks}
                        </Col>
                    </Row>
                </Container>
            </div>
            <footer className="footer footer-alt">
                2023 - {new Date().getFullYear()} © MyForeclosure -
                <Link href="" target="_blank" rel="noopener noreferrer">
                    MyForeclosure.org
                </Link>
            </footer>
        </>
    );
}