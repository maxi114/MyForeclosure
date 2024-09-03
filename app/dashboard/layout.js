import DashNav from "@/components/dashboard/navigation/DashNav"

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
        <body>
          <DashNav/>
            {children}
        </body>
    </html>
  );
}