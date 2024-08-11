import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import "./globals.css";
import Providers from './Providers';


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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
