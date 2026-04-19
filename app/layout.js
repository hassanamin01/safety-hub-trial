import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";
import TopNavWrapper from "./components/TopNavWrapper";
import PageHeaderWrapper from "./components/PageHeaderWrapper";
import TabBarWrapper from "./components/TabBarWrapper";

export const metadata = {
  title: "Safety Hub Trial",
  description: "Safety incident dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <StyledComponentsRegistry>
          <div style={{ position: 'sticky', top: 0, zIndex: 300, flexShrink: 0 }}>
            <TopNavWrapper />
            <PageHeaderWrapper />
            <TabBarWrapper />
          </div>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
