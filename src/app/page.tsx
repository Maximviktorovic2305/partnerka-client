import HomeComponent from "@/components/HomeComponent";
import { Suspense } from "react";

export default function Home() {
	return (
		<div className='size-full min-h-screen text-center text-lg mt-20'>
			<div>Добро пожаловать на тестовый сайт Partners</div>
			<Suspense fallback={<div>Загрузка...</div>}>
        		<HomeComponent />
    		</Suspense>
		</div>
	)
}
