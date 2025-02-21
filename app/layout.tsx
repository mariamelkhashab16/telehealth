import "./globals.css";
import { SystemDataProvider } from "./context/systemDataContext";
import NavWrapper from "./components/wrapper";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SystemDataProvider>
      <html lang="en">
        <body>
          <NavWrapper /> 
          <main>{children}</main>
        </body>
      </html>
    </SystemDataProvider>
  );
}
