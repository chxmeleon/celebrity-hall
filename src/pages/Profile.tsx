import { Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import {
  Info,
  Button,
  I18nTab,
  I18nTable
} from '../components/profile/Utilities'
import { useQuery } from '@apollo/client'
import {
  GET_PROFILE,
  GET_USERBETRECORDS,
  GET_SENDGIFTRECORDS
} from '@/gql/profile'
import { useAuth } from '@/contexts/AuthContext'

const GiftPanel: React.FC = () => {
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

const BetPanel: React.FC = () => {
  const { loading, data } = useQuery(GET_USERBETRECORDS, {
    variables: {
      startDate: '2022-01-15T13:30:56.681Z',
      endDate: '2023-01-15T13:30:56.681Z'
    }
  })
  if (loading) {
    return <div className="m-[50px]">loading</div>
  }
  console.log(data)
  return (
    <TabPanel>
      <I18nTable data={data.liveBaccaratBetRecords.records} type="bet" />
    </TabPanel>
  )
}

const Profile: React.FC = () => {
  const { loading, data } = useQuery(GET_PROFILE)
  const { logout } = useAuth()

  if (loading) {
    return <div className="m-[50px]">loading</div>
  }

  return (
    <div className="m-[10px]">
      <div className="m-auto sm:w-[1226px] sm:mt-[30px]">
        <div className="flex sm:items-center relative sm:flex-row flex-col sm:bg-inherit bg-[#1F1F1F] rounded-[10px] sm:pt-[0px] py-[20px] px-[10px]">
          <div className="flex items-center">
            {data.profile.avatar ? (
              <img
                className="rounded-full w-[70px] h-[70px] sm:w-[119px] sm:h-[119px]"
                src={data.profile.avatar}
              />
            ) : (
              <div className="w-[70px] h-[70px] i-heroicons-user-circle-solid sm:w-[119px] sm:h-[119px]" />
            )}
            <div className="text-[24px] sm:ml-[50px] sm:text-[40px]">
              {data.profile.nikename
                ? data.profile.nikename
                : data.profile.username}
            </div>
          </div>
          <div className="flex items-center mt-[20px] sm:mt-[0px]">
            <div className="sm:ml-[100px]">
              <Info
                i18nId="profile.info.points"
                data={
                  data.profile.creditBalance
                    ? data.profile.creditBalance.toLocaleString()
                    : 0
                }
                i18nDefaultMessage="上下分"
              />
              <Info
                i18nId="profile.info.betting"
                data={
                  data.profile.totalEffectiveAmount
                    ? data.profile.totalEffectiveAmount.toLocaleString()
                    : 0
                }
                i18nDefaultMessage="有效投注"
              />
            </div>
            <div className="ml-[50px] sm:ml-[80px]">
              <Info
                i18nId="profile.info.dividend"
                data={
                  data.profile.creditBalance
                    ? data.profile.creditBalance.toLocaleString()
                    : 0
                }
                i18nDefaultMessage="紅利"
              />
              <Info
                i18nId="profile.info.balance"
                data={
                  data.profile.balance
                    ? data.profile.balance.toLocaleString()
                    : 0
                }
                i18nDefaultMessage="餘額"
              />
            </div>
          </div>
          <div className="absolute right-[0px] top-[20px] right-[10px] sm:top-[30px]">
            <Button
              onClick={() => null}
              iconId="i-mdi-file-edit-outline"
              i18nId="profile.button.edit"
              i18nDefaultMessage="修改暱稱"
            />
            <Button
              onClick={() => null}
              iconId="i-mdi-onepassword"
              i18nDefaultMessage="修改密碼"
              i18nId="profile.button.password"
            />
            <Button
              onClick={logout}
              iconId="i-heroicons-arrow-right-on-rectangle-solid"
              i18nDefaultMessage="帳號登出"
              i18nId="profile.button.logout"
            />
          </div>
        </div>
        <div className="mt-[20px] sm:mt-[50px]">
          <Tabs variant="unstyled">
            <TabList>
              <I18nTab
                i18nDefaultMessage="上下紀錄"
                i18nId="profile.button.updown"
              />
              <I18nTab
                i18nDefaultMessage="下注紀錄"
                i18nId="profile.button.bet"
              />
              <I18nTab
                i18nDefaultMessage="送禮紀錄"
                i18nId="profile.button.gift"
              />
            </TabList>
            <TabPanels className="bg-[#505050] sm:min-h-[500px] min-h-[400px]">
              <GiftPanel />
              <BetPanel />
              <GiftPanel />
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Profile
