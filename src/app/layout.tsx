import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import SidebarMobile from '@/components/layout/SidebarMobile'
import Providers from '@/providers/Providers'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Partners | Partners app',
	description: 'Partners app for partners',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='size-full bg-primary'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased text-muted-foreground text-sm size-full`}>
				<Providers>
					<main className='bg-primary size-full'>
						
						<div className='flex'>
							<div>
								<Sidebar />
								<SidebarMobile />
							</div>
							<div className='bg-primary size-full'>
							<Header />
								<div className='bg-secondary size-full overflow-hidden'>
									{children}
								</div>
							</div>
						</div>
					</main>
				</Providers>
			</body>
		</html>
	)
}
