import { NotificationProvider } from "../context/NotificationContext";


export default function AccountLayout({ children }) {
  return (
    <div className="account-layout">
      <NotificationProvider>
          {children}
      </NotificationProvider>
    </div>
  );
}