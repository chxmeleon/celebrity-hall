import { FormattedMessage } from 'react-intl'
import { Tab } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react'

export const Info: React.FC<{
  i18nId: string
  data: number
  i18nDefaultMessage: string
}> = ({ i18nId, data, i18nDefaultMessage }) => {
  return (
    <div className="border-l-[2px] border-[#6F6F6F] pl-[15px] mt-[30px]">
      <div>
        <FormattedMessage id={i18nId} defaultMessage={i18nDefaultMessage} />
      </div>
      <div className="text-[#FFEC66] sm:text-[32px] font-bold">{data}</div>
    </div>
  )
}

export const Button: React.FC<{
  iconId: string
  i18nDefaultMessage: string
  i18nId: string
}> = ({ iconId, i18nDefaultMessage, i18nId }) => {
  return (
    <button className="flex items-center justify-center bg-[#303030] rounded-[30px] sm:w-[140px] sm:h-[30px] w-[117px] h-[25px] sm:mb-[19px] mb-[9px] sm:text-[13px] text-[10px]">
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
      className="bg-[#303030] sm:w-[213px] sm:h-[51px] w-[93px] h-[51px] mr-[6px] rounded-t-[20px]"
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
    <TableContainer className="sm:py-[40px]">
      <Table variant="unstyled" className="sm:w-[1172px] m-auto">
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
          {data.map((item: any) => (
            <TableBody item={item} type={type} />
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
