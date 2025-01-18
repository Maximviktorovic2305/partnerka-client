import { IPartner } from "@/types/partner.interface"
import WithdrawsTabsPayd from "./payd/WihdrawsTabsPayd"

interface Props {
  partner?: IPartner
}

const WithdrawsHistoryTabs = ({ partner }: Props) => {
  if (typeof window === 'undefined') {
    return
  }
  return (
    <div>
      <WithdrawsTabsPayd partner={partner} />
    </div>
  )
}

export default WithdrawsHistoryTabs