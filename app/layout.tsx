export const metadata = {
  title: "My Mini Shop",
  description: "Minimal shop with online/cash payment toggle",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{fontFamily:"Inter, system-ui, Arial, sans-serif"}}>
        {children}
      </body>
    </html>
  );
}
