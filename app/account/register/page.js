'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import PageBreadcrumb from '../../elements/PageBreadcrumb';
import CheckInput from '../../elements/Form/CheckInput';
import PasswordInput from '../../elements/Form/PasswordInput';
import TextInput from '../../elements/Form/TextInput';
import * as yup from 'yup';
import AccountWrapper from '../AccountWrapper';
import authApi from '../../api/auth/route';
import { Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../context/AuthContext';
import { useNotificationContext } from '../../context/NotificationContext';
import { Form as BootstrapForm } from 'react-bootstrap';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


const schema = yup.object().shape({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password1: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    password2: yup.string().oneOf([yup.ref('password1'), null], 'Passwords must match'),
    role: yup.string().oneOf(['Homeowner', 'Attorney'], 'Please select a valid role').required('Role is required'),
    terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions')
  });
  
  export default function Register() {
    const { t } = useTranslation();
    const router = useRouter();
    const { isAuthenticated } = useAuthContext();
    const { showNotification } = useNotificationContext();
    const [loading, setLoading] = useState(false);
  
    const methods = useForm({
      resolver: yupResolver(schema)
    });
  
    const { handleSubmit, formState: { errors } } = methods;
  
    if (isAuthenticated) {
      router.replace('/');
      return null;
    }
  
    const onSubmit = async (values) => {
        console.log('Form submitted with values', values);
        setLoading(true);
        try {
          const user = authApi.register({
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password1,
            role: values.role
          });
          if (user) {
            showNotification({
              message: 'Registration successful. Welcome aboard!',
              type: 'success',
            });
            router.push('/error/maintenance');
          } else {
            throw new Error('Registration failed');
          }
        } catch (error) {
          showNotification({ message: error.message, type: 'error' });
        } finally {
          setLoading(false);
        }
      };
  
    return (
      <>
        <PageBreadcrumb title="Register" />
        <AccountWrapper bottomLinks={<BottomLink />}>
          <div className="text-center w-75 m-auto">
            <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Free Sign Up')}</h4>
            <p className="text-muted mb-4">
              {t("Don't have an account? Create your account, it takes less than a minute")}
            </p>
          </div>
  
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                label={t('First name')}
                name="firstname"
                error={errors.firstname?.message}
                placeholder={t('Enter your first name')}
                containerClass="mb-3"
              />
              <TextInput
                label={t('Last name')}
                name="lastname"
                error={errors.lastname?.message}
                placeholder={t('Enter your last name')}
                containerClass="mb-3"
              />
              <TextInput
                label={t('Email Address')}
                name="email"
                error={errors.email?.message}
                placeholder={t('Enter your email')}
                containerClass="mb-3"
              />
              <PasswordInput
                label={t('Password')}
                name="password1"
                error={errors.password1?.message}
                placeholder={t('Enter password')}
                containerClass="mb-3"
              />
              <PasswordInput
                label={t('Confirm Password')}
                name="password2"
                error={errors.password2?.message}
                placeholder={t('Confirm password')}
                containerClass="mb-3"
              />
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>{t('User Type')}</BootstrapForm.Label>
                <div>
                  <BootstrapForm.Check
                    inline
                    type="radio"
                    label={t('Homeowner')}
                    {...methods.register('role')}
                    value="Homeowner"
                    id="homeowner-radio"
                  />
                  <BootstrapForm.Check
                    inline
                    type="radio"
                    label={t('Attorney')}
                    {...methods.register('role')}
                    value="Attorney"
                    id="attorney-radio"
                  />
                </div>
                {errors.role && <span className="text-danger">{errors.role.message}</span>}
              </BootstrapForm.Group>
              <CheckInput
                {...methods.register('terms')}
                type="checkbox"
                containerClass="mb-2"
                label={
                  <>
                    I accept
                    <span className="text-muted cursor-pointer">Terms and Conditions</span>
                  </>
                }
                defaultChecked
              />
              {errors.terms && <span className="text-danger">{errors.terms.message}</span>}
              <div className="mb-3 text-center">
                <Button variant="primary" type="submit" disabled={loading}>
                  {t('Sign Up')}
                </Button>
              </div>
            </form>
          </FormProvider>
        </AccountWrapper>
      </>
    );
  }
  
  const BottomLink = () => {
        const { t } = useTranslation();
        return(
            <Row className="mt-3">
                <Col className="text-center">
                    <p className="text-muted">
                        {t('Already have account?')}
                        <Link href="/account/login" className="text-muted ms-1">
                            <b>{t('Log In')}</b>
                        </Link>
                    </p>
                </Col>
            </Row>
        );
    };


    // export default function Register() {
//     const { t } = useTranslation();
//     const router = useRouter();
//     const { loading, register, isAuthenticated, schema } = useRegister();

//     const handleSubmit = (values) => {
//         console.log('Form submitted with data', values);
//         register(values);
//     };

//     if (isAuthenticated) {
//         router.replace('/');
//         return null;   
//     }

//     return(
//         <>
//         <PageBreadcrumb title="Register" />
//             <AccountWrapper bottomLinks={<BottomLink />}>
//                 <div className="text-center w-75 m-auto">
//                     <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Free Sign Up')}</h4>
//                     <p className="text-muted mb-4">
//                         {t("Don't have an account? Create your account, it takes less than a minute")}
//                     </p>
//                 </div>

//                 <Form
//                     onSubmit={handleSubmit}
//                     schema={schema}
//                     defaultValues={{
//                         email: '',
//                         username: '',
//                         password1: 'Password123',
//                         password2: 'Password123',
//                         role: '',
//                         checkbox: true,
//                     }}
//                     onError={(errors) => console.log('Form validation errors', errors)}
//                 >
//                     <TextInput
//                         label={t('First name')}
//                         type="text"
//                         name="firstname"
//                         placeholder={t('Enter first your name')}
//                         containerClass="mb-3"
//                     />
//                     <TextInput
//                         label={t('Last name')}
//                         type="text"
//                         name="lastname"
//                         placeholder={t('Enter last your name')}
//                         containerClass="mb-3"
//                     />
//                     <TextInput
//                         label={t('Email Address')}
//                         type="text"
//                         name="email"
//                         placeholder={t('Enter your email')}
//                         containerClass="mb-3"
//                     />
//                     <PasswordInput
//                         label={t('Password')}
//                         name="password1"
//                         placeholder={t('Enter password')}
//                         containerClass="mb-3"
//                     />
//                     <PasswordInput
//                         label={t('Confirm Password')}
//                         name="password2"
//                         placeholder={t('Confirm password')}
//                         containerClass="mb-3"
//                     />
//                     <BootstrapForm.Group className="mb-3">
//                         <BootstrapForm.Label>{t('User Type')}</BootstrapForm.Label>
//                         <div>
//                             <BootstrapForm.Check
//                                 inline
//                                 type="radio"
//                                 label={t('Homeowner')}
//                                 name="role"
//                                 value="Homeowner"
//                                 id="homeowner-radio"
//                             />
//                             <BootstrapForm.Check
//                                 inline
//                                 type="radio"
//                                 label={t('Attorney')}
//                                 name="role"
//                                 value="Attorney"
//                                 id="attorney-radio"
//                             />
//                         </div>
//                     </BootstrapForm.Group>
//                     <CheckInput
//                         name="checkbox"
//                         type="checkbox"
//                         containerClass="mb-2"
//                         label={
//                             <>
//                                 I accept
//                                 <span className="text-muted cursor-pointer">Terms and Conditions</span>
//                             </>
//                         }
//                         defaultChecked
//                     />
//                     <div className="mb-3 text-center">
//                         <Button variant="primary" type="submit" disabled={loading} onClick={register}>
//                             {t('Sign Up')}
//                         </Button>
//                     </div>
//                 </Form>
//             </AccountWrapper>
//         </>
//     )
// };

// export function useRegister() {
//     const [loading, setLoading] = useState(false);
//     const { t } = useTranslation();
//     const router = useRouter();
//     const { isAuthenticated } = useAuthContext();
//     const { showNotification } = useNotificationContext();

//     const schema = yup.object().shape({
//         firstname: yup.string().required(t('Please enter name')),
//         lastname: yup.string().required(t('Please enter name')),
//         email: yup.string().email('Please enter valid email').required(t('Please enter email')),
//         password1: yup
//             .string()
//             .required(t('Please enter password'))
//             .min(8, 'Password is too short - should be 8 chars minimum')
//             .matches(/[a-zA-Z]/, 'Password can only contain latin letters'),
//         password2: yup.string().oneOf([yup.ref('password1')], 'Passwords must match'),
//         role: yup.string().oneOf(['Homeowner', 'Attorney'], 'Please select a valid role').required('Please select a role'),
//     });

//     const register = async (values) => {
//         const {firstname, lastname, email, password1, role } = values;
//         console.log("Register components:", firstname, lastname, email, password1, role )
//         setLoading(true);
//         try {
//             const user = await authApi.register({ 
//                 firstname: values.firstname, 
//                 lastname: values.lastname, 
//                 email: values.email, 
//                 password: values.password1, 
//                 role: values.role });
//             if (user) {
//                 showNotification({
//                     message: 'Registration successful. Welcome aboard!',
//                     type: 'success',
//                 });
//                 router.push('/account/login');
//             } else {
//                 throw new Error('Registration failed');
//             }
//         } catch (error) {
//             showNotification({ message: error.message, type: 'error' });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { loading, register, isAuthenticated, schema };
// };


// const BottomLink = () => {
//     const { t } = useTranslation();
//     return(
//         <Row className="mt-3">
//             <Col className="text-center">
//                 <p className="text-muted">
//                     {t('Already have account?')}
//                     <Link href="/account/login" className="text-muted ms-1">
//                         <b>{t('Log In')}</b>
//                     </Link>
//                 </p>
//             </Col>
//         </Row>
//     );
// };