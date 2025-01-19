const News = () => {
	return (
		<div className='bg-white flex flex-1 mr-5 rounded p-7 flex-col gap-2 text-left'>
			<div className='text-xl font-semibold text-blue2'>Последние новости</div>
			<div className='flex flex-col text-sm'>
				<p className='text-grayDeep'>10.09.2024</p>
				<p className='text-blue1'>Новость первая</p>
				<p>Новость с описанием</p>
			</div>
		</div>
	)
}

export default News
