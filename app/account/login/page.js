'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import CheckInput from '../../elements/Form/CheckInput';
import Form from '../../elements/Form/Form';
import PasswordInput from '../../elements/Form/PasswordInput';
import TextInput from '../../elements/Form/TextInput';
import { Button, Col, Row } from 'react-bootstrap';
import AccountWrapper from '../AccountWrapper';
import { useAuthContext } from '../../context/AuthContext';
import { useNotificationContext } from '../../context/NotificationContext';
import authApi from '../../api/auth/route';
import * as yup from 'yup';

const loginFormSchema = yup.object({
  email: yup.string().email('Please enter valid email').required('Please enter email'),
  password: yup.string().required('Please enter password'),
});

const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-muted">
          {t("Don't have an account?")}
          <Link href="/account/register" className="text-muted ms-1">
            <b>{t('Sign Up')}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

export default function Login({ searchParams }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const { showNotification } = useNotificationContext();

  const redirectUrl = useMemo(
    () => (searchParams?.from ? searchParams.from.toString() : '/dashboard'),
    [searchParams]
  );

  if (isAuthenticated) {
    router.replace(redirectUrl);
    return null;
  }

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const user = await authApi.login(values);
      if (user) {
        showNotification({
          message: 'Login successful. Welcome!',
          type: 'success',
        });
        router.push('/dashboard');
      }
    } catch (error) {
      showNotification({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AccountWrapper bottomLinks={<BottomLink />}>
      <div className="text-center w-75 m-auto">
        <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Sign In')}</h4>
        <p className="text-muted mb-4">
          {t('Enter your email and password to access admin panel.')}
        </p>
      </div>

      <Form
        onSubmit={handleLogin}
        schema={loginFormSchema}
        defaultValues={{ email: '', password: '' }}
      >
        <Row>
          <Col>
            <TextInput
              name="email"
              label={t('Email Address')}
              type="email"
              placeholder={t('Enter your email')}
              containerClass="mb-3"
            />
          </Col>
        </Row>
        <PasswordInput
          label={t('Password')}
          name="password"
          placeholder={t('Enter your password')}
          containerClass="mb-3"
        >
          <Link href="/account/recover-password" className="text-muted float-end">
            <small>{t('Forgot your password?')}</small>
          </Link>
        </PasswordInput>

        <CheckInput
          name="rememberme"
          type="checkbox"
          label={t('Remember me')}
          containerClass="mb-3"
          defaultChecked
        />

        <div className="mb-3 text-center">
          <Button variant="primary" type="submit" disabled={loading}>
            {t('Log In')}
          </Button>
        </div>
      </Form>
    </AccountWrapper>
  );
}