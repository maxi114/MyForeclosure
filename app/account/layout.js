import { NotificationProvider } from "../context/NotificationContext";


export default function AccountLayout({ children }) {
  return (
    <html lang="en">
        <body>
            <NotificationProvider>
                {children}
            </NotificationProvider>
        </body>
    </html>
  );
}