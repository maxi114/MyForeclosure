'use client';
const Register = dynamic(() => import('./register/page'), { ssr: false });
const Login = dynamic(() => import('./login/page'), {ssr: false});

export default function AccountPage() {
  return (
    <>
        <Login/>
        <Register/>
    </>
  );
}