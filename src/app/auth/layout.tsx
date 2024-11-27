export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
   return (
      <body>
       <main className="size-full">{children}</main>
      </body>
   );
 }