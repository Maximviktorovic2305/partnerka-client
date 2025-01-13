import PartnerPage from "@/components/partners/partner/PartnerPage"

export default async function Page({
	params,
}: {
	params: Promise<{ id: number }>
}) {
	const id = (await params).id
	return <PartnerPage id={id} />
}
