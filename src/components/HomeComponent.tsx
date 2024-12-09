'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { Button } from './ui/button'
import CreateRefferalLink from './reffferal-link/CreateRefferalLink'
import RefferalLinkService from '@/services/referral-links/referral-links.service'
import { useGetRefferalLinkById } from '@/queries/refferal-link'

const HomeComponent = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [partnerId, setPartnerId] = useState('')
	const [messageFromResponse, setMessageFromResponse] = useState('')

	const [reffParam, setReffParam] = useState('')
	const [paramPartnerId, setParamPartnerId] = useState('')
	const [deviceId, setDeviceId] = useState('')

	const { data } = useGetRefferalLinkById(Number(reffParam))

	const handleRegisterLink = useCallback(async () => {  
		try {
			const response = await RefferalLinkService.updateRefferalLink({id: Number(reffParam), devicesId: deviceId})
			if (response) {
				setMessageFromResponse('Вы успешно зарегистировались')
			}
		} catch (error) {
			console.log('Вы уже зарегистрированы по этой ссылке', error)
			setMessageFromResponse('Вы уже зарегистрированы по этой ссылке')
		}       
	}, [deviceId, reffParam])

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

	}, [deviceId, pathname, searchParams])

	return (
		<>
			<div>Id reff: {reffParam}</div>
			<div>Id партнера: {paramPartnerId}</div>
			<div className="mb-10">Уникальный идентификатор устройства: {deviceId}</div> {/* Выводим уникальный идентификатор устройства */}
      	<Button onClick={handleRegisterLink}>Регистрация</Button>
			<div className='mt-3'>Выбранный Партнер: {partnerId}</div>
			<CreateRefferalLink partnerId={partnerId} setPartnerId={setPartnerId} />   
			{messageFromResponse && <div>{messageFromResponse}</div>} 
			<div>Всего зарегистировано по ссылке: { data?.registerCount }</div>      
		</>
	)
}

export default HomeComponent
