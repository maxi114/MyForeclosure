import "./styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Providers from './Providers';


export const metadata = {
  title: "MyForeclosure",
  description: "MyForeclosure",
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
