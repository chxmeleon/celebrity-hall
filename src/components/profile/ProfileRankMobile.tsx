import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import { Info, Button, I18nTab, GiftPanel, BetPanel } from './Utilities'
import { useQuery } from '@apollo/client'
import { GET_PROFILE } from '@/gql/profile'
import { useAuth } from '@/contexts/AuthContext'
import types from '@/types'
import { useSetup } from '@/contexts/SetupContext'

const ProfileRankMobile = () => {
  const { loading, data } = useQuery<types.GET_PROFILE>(GET_PROFILE)
  const { logout, isTrait } = useAuth()
  const { openEditPassword, openEditNickname } = useSetup()

  if (loading) {
    return <div className="m-[50px]">loading</div>
  }

  return (
    <div className="flex relative flex-col px-4 mt-6 w-full h-full">
      <div className="p-4 w-full h-1/2 rounded-xl bg-theme-50">
        <div className="flex justify-between items-center w-full h-full">
          <div className="flex justify-between items-center w-1/2 h-full">
            {data?.profile?.avatar ? (
              <div className="overflow-hidden w-12 h-12 rounded-full">
                <img
                  className="object-cover w-full h-full"
                  src={data.profile.avatar}
                />
              </div>
            ) : (
              <div className="w-12 h-12 i-heroicons-user-circle-solid" />
            )}
            <div>
              {data?.profile?.nickname
                ? data.profile.nickname
                : data?.profile?.username}
            </div>
          </div>
          <div className="flex justify-end w-1/2 h-full">
            <div className="">
              <Button
                isTrait={isTrait}
                onClick={openEditNickname}
                iconId="i-mdi-file-edit-outline"
                i18nId="profile.button.edit"
                i18nDefaultMessage="修改暱稱"
              />
              <Button
                isTrait={isTrait}
                onClick={openEditPassword}
                iconId="i-mdi-onepassword"
                i18nDefaultMessage="修改密碼"
                i18nId="profile.button.password"
              />
              <Button
                isTrait={false}
                onClick={logout}
                iconId="i-heroicons-arrow-right-on-rectangle-solid"
                i18nDefaultMessage="帳號登出"
                i18nId="profile.button.logout"
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <Info
              i18nId="profile.info.points"
              data={
                data?.profile?.creditBalance ? data.profile.creditBalance : 0
              }
              i18nDefaultMessage="上下分"
            />
            <Info
              i18nId="profile.info.betting"
              data={
                data?.profile?.totalEffectiveAmount
                  ? data.profile.totalEffectiveAmount
                  : 0
              }
              i18nDefaultMessage="有效投注"
            />
          </div>
          <div className="w-1/2">
            <Info
              i18nId="profile.info.dividend"
              data={
                data?.profile?.creditBalance ? data.profile.creditBalance : 0
              }
              i18nDefaultMessage="紅利"
            />
            <Info
              i18nId="profile.info.balance"
              data={data?.profile?.balance ? data.profile.balance : 0}
              i18nDefaultMessage="餘額"
            />
          </div>
        </div>
      </div>

      <div className="py-3 m-auto w-full h-1/2">
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

          <div className="bg-[#505050] h-60 overflow-x-hidden overflow-y-auto">
            <TabPanels className="bg-[#505050] h-full">
              <GiftPanel />
              <BetPanel />
              <GiftPanel />
            </TabPanels>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default ProfileRankMobile
