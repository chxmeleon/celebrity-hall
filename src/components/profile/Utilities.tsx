import { FormattedMessage } from 'react-intl'
import { Tab } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import {
  GET_PROFILE,
  GET_USERBETRECORDS,
  GET_SENDGIFTRECORDS
} from '@/gql/profile'
import { useAuth } from '@/contexts/AuthContext'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TabPanels,
  TabPanel
} from '@chakra-ui/react'

export const Info: React.FC<{
  i18nId: string
  data: number
  i18nDefaultMessage: string
}> = ({ i18nId, data, i18nDefaultMessage }) => {
  return (
    <div className="border-l-[2px] border-[#6F6F6F] pl-3 mb-3">
      <div>
        <FormattedMessage id={i18nId} defaultMessage={i18nDefaultMessage} />
      </div>
      <div className="text-[#FFEC66] text-2xl font-bold">{data}</div>
    </div>
  )
}

export const Button: React.FC<{
  onClick: React.MouseEventHandler<HTMLButtonElement>
  iconId: string
  i18nDefaultMessage: string
  i18nId: string
}> = ({ onClick, iconId, i18nDefaultMessage, i18nId }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center bg-[#303030] rounded-[30px] sm:w-[140px] sm:h-[30px] w-[117px] h-[25px] sm:mb-[19px] mb-[9px] sm:text-[13px] text-[10px]"
    >
      <div className={`${iconId} text-lg mr-[6px]`} />
      <div className="text-[13px]">
        <FormattedMessage id={i18nId} defaultMessage={i18nDefaultMessage} />
      </div>
    </button>
  )
}

export const I18nTab: React.FC<{
  i18nDefaultMessage: string
  i18nId: string
}> = ({ i18nDefaultMessage, i18nId }) => {
  return (
    <Tab
      className="bg-[#303030]  w-36 h-9 py-1 px-2 mr-[6px] rounded-t-2xl"
      _selected={{ bg: '#505050' }}
    >
      <FormattedMessage id={i18nId} defaultMessage={i18nDefaultMessage} />
    </Tab>
  )
}

export const I18nTable: React.FC<{
  data?: any
  type: string
}> = ({ data, type }) => {
  return (
    <TableContainer className="w-full">
      <Table variant="unstyled" className="m-auto">
        <Thead className="border-b border-[#A7A7A7] h-[50px]">
          <Tr>
            <Th>
              <FormattedMessage id="profile.table.time" defaultMessage="時間" />
            </Th>
            <Th>
              <FormattedMessage
                id="profile.table.point"
                defaultMessage="點數"
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item: any, idx: number) => (
            <TableBody item={item} type={type} key={idx} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export const TableBody: React.FC<{
  item: any
  type: string
}> = ({ item, type }) => {
  let point
  switch (type) {
    case 'gift':
      point = item.info.amount.toLocaleString()
      break
    case 'bet':
      point = item.totalBet.toLocaleString()
      break
    default:
      break
  }

  return (
    <Tr key={item.id}>
      <Td>{item.createdAt}</Td>
      <Td isNumeric>{point}</Td>
    </Tr>
  )
}

export const GiftPanel: React.FC = () => {
  const { loading, data } = useQuery(GET_SENDGIFTRECORDS, {
    variables: {
      startDate: '2022-01-15T13:30:56.681Z',
      endDate: '2023-01-15T13:30:56.681Z'
    }
  })
  if (loading) {
    return <div className="m-[50px]">loading</div>
  }
  return (
    <TabPanel>
      <I18nTable data={data.sendGiftRecords.records} type="gift" />
    </TabPanel>
  )
}

export const BetPanel: React.FC = () => {
  const { loading, data } = useQuery(GET_USERBETRECORDS, {
    variables: {
      startDate: '2022-01-15T13:30:56.681Z',
      endDate: '2023-01-15T13:30:56.681Z'
    }
  })
  if (loading) {
    return <div className="m-[50px]">loading</div>
  }
  return (
    <TabPanel>
      <I18nTable data={data.liveBaccaratBetRecords.records} type="bet" />
    </TabPanel>
  )
}
