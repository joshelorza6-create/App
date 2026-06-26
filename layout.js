export const metadata = {
  title: "Oso Odds",
  description: "Oso Odds analytics terminal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
