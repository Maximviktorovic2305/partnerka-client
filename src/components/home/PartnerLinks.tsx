import { IRefferalLink } from '@/types/refferal-links.interface'
import ReferralLinkActions from './ReferralLinkActions'

interface Props {
	links: IRefferalLink[]
	className?: string
}

const PartnerLinks = ({ links, className }: Props) => {
	return (
		<div className={`bg-white min-w-fit rounded p-7 flex flex-col gap-2 max-w-[300px] text-left ${className}`}>
			<div className='text-2xl text-blue2 font-semibold'>Мои ссылки</div>
			{links?.map((link) => (
				<div key={link.id} className='text-blue3'>
					<div className='text-sm text-grayDeep'>{link.name}</div>
					<div className='flex items-center gap-2'>
						<div className='text-sm text-blue1'>{link.serverLinkPath}</div>
						<ReferralLinkActions link={link.serverLinkPath ?? ''} />
					</div>
				</div>
			))}
		</div>
	)
}

export default PartnerLinks
