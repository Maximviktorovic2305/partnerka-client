import { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import Providers from '@/providers/Providers'
import Header from '@/components/layout/Header'
import Script from 'next/script'

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
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' className='size-full bg-primary'>
			<head>
			<Script id='partner-script' strategy='afterInteractive'>
				{`
					const urlParams = new URLSearchParams(window.location.search);
					const add = urlParams.get('add');

					const checkCookie = (name, value) => {
						const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name));
						return cookieValue ? cookieValue.split('=')[1] === value : false;
					};

					if (add) {
						console.log(add);
						const unique = !checkCookie('add', add);

						if (unique) {
								document.cookie = \`add=\${add}; path=/; max-age=2592000;\`;
						}

						fetch('http://localhost:3339/conversation', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({ add, unique }),
						})
						.then(response => response.json())
						.then(data => {
								console.log('Success:', data);
								// Установка куки партнера, если уникальный
								if (data.add && unique) {
									document.cookie = \`add=\${data.add}; path=/; max-age=2592000;\`;
								}
						})
						.catch(error => console.error('Error:', error));
					}
				`}
			</Script>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased text-muted-foreground text-sm size-full`}>
				<Providers>
					<main className='bg-primary size-full'>
						<div className='flex'>
							<div>
								<Sidebar />
								{/* <SidebarMobile /> */}
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
