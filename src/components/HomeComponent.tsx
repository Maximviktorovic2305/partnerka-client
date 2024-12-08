'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { Button } from './ui/button'

const HomeComponent = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [reffParam, setReffParam] = useState('')
	const [paramPartnerId, setParamPartnerId] = useState('')
	const [deviceId, setDeviceId] = useState('')

	useEffect(() => {
		const reff = searchParams.get('reff')
		const partnerId = searchParams.get('partnerId')

		// Получаем отпечаток устройства
		const getFingerprint = async () => {
			const fp = await FingerprintJS.load()
			const result = await fp.get()

			setDeviceId(result.visitorId) // Уникальный идентификатор устройства
		}

		getFingerprint()

		setReffParam(reff?.replace(/"/g, '') ?? '')
		setParamPartnerId(partnerId?.replace(/"/g, '') ?? '')

		if (reff) {
			sessionStorage.setItem('reff', reff.replace(/"/g, ''))
		}
		if (partnerId) {
			sessionStorage.setItem('partnerId', partnerId.replace(/"/g, ''))
		}

		if (deviceId) {
			sessionStorage.setItem('deviceId', deviceId)
		}
	}, [deviceId, pathname, searchParams])

	return (
		<>
			<div>Id ref: {reffParam}</div>
			<div>Id партнера: {paramPartnerId}</div>
			<div>Уникальный идентификатор устройства: {deviceId}</div> {/* Выводим уникальный идентификатор устройства */}
      <Button>Регистрация</Button>
		</>
	)
}

export default HomeComponent
