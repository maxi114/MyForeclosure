import { Container, Row, Col } from 'react-bootstrap';

const TermsAndConditions = () => {
  return (
    <section className="py-5" id="faq-landing">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <h1 className="mt-0 text-primary">
                MyForeclosure Terms and Conditions
              </h1>
              <h3>
                Frequently Asked Questions
              </h3>
              <p className="text-muted mt-3">
                Here are some of the basic types of questions for our customers. For more
                <br />
                information please contact us.
              </p>
              <p>
                Welcome to MyForeclosure ("the Platform"), an online service that connects homeowners facing 
                <br/> foreclosure with real estate attorneys, realtors, and investors through AI technology. By using our web 
                <br/> application, you agree to comply with and be bound by the following terms and conditions ("Terms").
                <br/> Please read them carefully before using the Platform.
              </p>

              <h4>
                1. Acceptance of Terms
              </h4>
              <p>
                By accessing or using the MyForeclosure Platform (currently in BETA), you acknowledge that you have
                <br/> read, understood, and agree to these Terms and our Privacy Policy. If you do not agree to these
                <br/> Terms, you may not use the Platform.
              </p>

              <h4>
                2. BETA Disclaimer
              </h4>
              <p>
                MyForeclosure is currently in its BETA version. This means that the Platform is still under development
                <br/> and may undergo significant changes. As a BETA user, you may experience issues, bugs, or disruptions,
                <br/> and features may not function as intended. We appreciate your feedback and patience as we continue 
                <br/> to improve the Platform.
              </p>

              <h4>
                3. Scope of Services
              </h4>
              <p>
                MyForeclosure offers tools and services related to foreclosure, including:
                <br/> Connection with Real Estate Professionals: We facilitate connections between homeowners 
                <br/>facing foreclosure and real estate attorneys, realtors, and investors. AI-Powered Tools: 
                <br/> The Platform integrates AI technology to assist in foreclosure prediction, mitigation,  
                <br/> recovery, and decision-making processes.Resource Access: Homeowners and professionals may access 
                <br/> educational materials, reports, and market data relevant to foreclosure.
                <br/> Our Platform does not offer direct legal, financial, or real estate advice. 
                <br/> Any actions you take based on connections made or data provided are at your own discretion and risk.
              </p>

              <h4>
                4. User Responsibilities
              </h4>
              <p>
                Accuracy of Information: You are responsible for ensuring that all information provided on the 
                <br/> Platform is accurate and up-to-date.Compliance with Laws: You agree to comply with all  
                <br/> applicable local, state, and federal laws in connection with your use of the Platform, especially
                <br/> those related to real estate transactions and foreclosure processes. Account Security: You are 
                <br/> responsible for maintaining the confidentiality of your account credentials and for any activities under your account.
              </p>

              <h4>
                5. Third-Party Professionals
              </h4>
              <p>
                The Platform connects you with third-party real estate professionals, including attorneys, realtors, 
                <br/> and investors. MyForeclosure does not endorse, guarantee, or take responsibility for the services 
                <br/> provided by these third parties. Any agreements, contracts, or legal documents entered into are solely between 
                <br/> you and the third party.
              </p>

              <h4>
                6. AI Tools and Limitations
              </h4>
              <p>
                MyForeclosure utilizes artificial intelligence to provide foreclosure-related data, predictions, 
                <br/> and recommendations. However, these AI-driven insights are based on algorithms and should not 
                <br/> replace professional advice. We do not guarantee the accuracy, reliability, or completeness of 
                <br/> any AI-generated information, and you acknowledge that such information is used at your own risk.
              </p>

              <h4>
                7. Intellectual Property
              </h4>
              <p>
                All content, features, and functionality of the Platform, including but not limited to the design, graphics, 
                <br/> trademarks, and software, are owned by MyForeclosure and protected by intellectual property laws. You 
                <br/> may not reproduce, distribute, or create derivative works from any content on the Platform without our 
                <br/> prior written permission.
              </p>

              <h4>
                8. Limitation of Liability
              </h4>
              <p>
                To the fullest extent permitted by law, MyForeclosure, its officers, employees, and partners will not be 
                <br/> liable for any indirect, incidental, consequential, or punitive damages arising from your use of the 
                <br/> Platform, including, but not limited to, the services provided by third-party professionals, loss of data,
                <br/> or system errors.
              </p>

              <h4>
                9. Indemnification
              </h4>
              <p>
                You agree to indemnify, defend, and hold harmless MyForeclosure, its affiliates, and employees from and against
                <br/>  any claims, liabilities, damages, losses, or expenses (including reasonable attorneys' fees) arising out 
                <br/> of or in any way connected with your access to or use of the Platform, your violation of these Terms, or 
                <br/> any third-party claims arising out of your use of the Platform.
              </p>

              <h4>
                10. Termination
              </h4>
              <p>
                MyForeclosure reserves the right to suspend or terminate your access to the Platform at any time, without notice 
                <br/> or liability, for any reason, including but not limited to your breach of these Terms.
              </p>

              <h4>
                11. Changes to the Terms
              </h4>
              <p>
                We reserve the right to update or modify these Terms at any time without prior notice. Any changes will be 
                <br/> effective immediately upon posting on the Platform. Your continued use of the Platform following the 
                <br/> posting of changes constitutes your acceptance of those changes.
              </p>

              <h4>
                12. Governing Law
              </h4>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without 
                <br/> regard to its conflict of law provisions.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TermsAndConditions;