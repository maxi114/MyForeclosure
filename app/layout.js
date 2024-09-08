import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import "./globals.css";
import Providers from './Providers';
import { AuthProvider } from './context/AuthContext';


export const metadata = {
  title: "MyForeclosure",
  description: "MyForeclosure",
  icons: {
    icon: '/My_3.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
