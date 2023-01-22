import { FormattedMessage } from 'react-intl'
import { Tab } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import {
  GET_PROFILE,
  GET_USERBETRECORDS,
  GET_SENDGIFTRECORDS
} from '@/gql/profile'
import { useAuth } from '@/contexts/AuthContext'
import types from '@/types'
import dayjs from 'dayjs'

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
import { useMemo } from 'react'

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
      <div className="text-[#FFEC66] text-2xl font-bold">
        {data.toLocaleString()}
      </div>
    </div>
  )
}

export const Button: React.FC<{
  onClick: React.MouseEventHandler<HTMLButtonElement>
  isTrait: boolean
  iconId: string
  i18nDefaultMessage: string
  i18nId: string
}> = ({ onClick, iconId, i18nDefaultMessage, i18nId, isTrait }) => {
  return (
    <button
      onClick={onClick}
      disabled={isTrait && true}
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
    <TableContainer className="w-full px-4 overflow-y-scroll">
      <Table variant="unstyled" className="m-auto w-full">
        <Thead className="border-b border-[#A7A7A7] h-[49px] ">
          <Tr className="w-full px-1">
            <Th className="w-3/4 text-left ">
              <FormattedMessage id="profile.table.time" defaultMessage="時間" />
            </Th>
            <Th className="w-1/4 text-right">
              <FormattedMessage
                id="profile.table.point"
                defaultMessage="點數"
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody className="py-1">
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
      <Td className="w-20 text-left">{item.createdAt}</Td>
      <Td className="text-right" isNumeric>
        {point}
      </Td>
    </Tr>
  )
}

export const GiftPanel: React.FC = () => {
  const today = useMemo(() => dayjs(), [])
  const start = useMemo(() => dayjs().subtract(10, 'year'), [])

  const { loading, data } = useQuery<
    types.GET_SENDGIFTRECORDS,
    types.GET_SENDGIFTRECORDSVariables
  >(GET_SENDGIFTRECORDS, {
    variables: {
      startDate: start.toISOString(),
      endDate: today.toISOString()
    }
  })
  if (loading) {
    return <div className="m-[50px]">loading</div>
  }
  return (
    <TabPanel>
      {data?.sendGiftRecords && (
        <I18nTable data={data.sendGiftRecords.records} type="gift" />
      )}
    </TabPanel>
  )
}

export const BetPanel: React.FC = () => {
  const today = useMemo(() => dayjs(), [])
  const start = useMemo(() => dayjs().subtract(10, 'year'), [])

  const { loading, data } = useQuery<
    types.GET_USERBETRECORDS,
    types.GET_USERBETRECORDSVariables
  >(GET_USERBETRECORDS, {
    variables: {
      startDate: start.toISOString(),
      endDate: today.toISOString()
    }
  })
  if (loading) {
    return <div className="m-[50px]">loading</div>
  }
  return (
    <TabPanel>
      {data?.liveBaccaratBetRecords && (
        <I18nTable data={data.liveBaccaratBetRecords.records} type="bet" />
      )}
    </TabPanel>
  )
}
