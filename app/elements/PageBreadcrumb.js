'use client';
import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';

const PageBreadcrumb = ({ subName, title, children }) => {
  return (
    <>
      <Head>
        <title>{title} | MyForecloaure - Admin Dashboard</title>
      </Head>
      {subName && (
        <Row>
          <Col>
            <div className="page-title-box">
              <div className="page-title-right">
                <Breadcrumb listProps={{ className: 'm-0' }}>
                  <Breadcrumb.Item linkAs={Link} href="/">Hyper</Breadcrumb.Item>
                  <Breadcrumb.Item linkAs={Link} href={`/${subName.toLowerCase()}`}>{subName}</Breadcrumb.Item>
                  <Breadcrumb.Item active>{title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <h4 className="page-title">
                {title}
                {children ?? null}
              </h4>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PageBreadcrumb;