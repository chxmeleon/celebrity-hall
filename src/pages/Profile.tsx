import { Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import {
  Info,
  Button,
  I18nTab,
  I18nTable,
} from "../components/profile/Utilities";

const Profile: React.FC = () => {
  return (
    <div className="m-[10px]">
      <div className="sm:w-[1226px] m-auto sm:mt-[30px]">
        <div className="flex sm:items-center relative sm:flex-row flex-col sm:bg-inherit bg-[#1F1F1F] rounded-[10px] sm:pt-[0px] py-[20px] px-[10px]">
          <div className="flex items-center">
            <div className="sm:w-[119px] sm:h-[119px] w-[70px] h-[70px] i-heroicons-user-circle-solid" />
            <div className="sm:ml-[50px] sm:text-[40px] text-[24px] ">XXXX</div>
          </div>
          <div className="flex items-center sm:mt-[0px] mt-[20px]">
            <div className="sm:ml-[100px]">
              <Info
                i18nId="profile.info.points"
                data={100000000}
                i18nDefaultMessage="上下分"
              />
              <Info
                i18nId="profile.info.betting"
                data={0}
                i18nDefaultMessage="有效投注"
              />
            </div>
            <div className="sm:ml-[80px] ml-[50px]">
              <Info
                i18nId="profile.info.dividend"
                data={0}
                i18nDefaultMessage="紅利"
              />
              <Info
                i18nId="profile.info.balance"
                data={100000000}
                i18nDefaultMessage="餘額"
              />
            </div>
          </div>
          <div className="absolute right-[0px] sm:top-[30px] top-[20px] right-[10px]">
            <Button
              iconId="i-mdi-file-edit-outline"
              i18nId="profile.button.edit"
              i18nDefaultMessage="修改暱稱"
            />
            <Button
              iconId="i-mdi-onepassword"
              i18nDefaultMessage="修改密碼"
              i18nId="profile.button.password"
            />
            <Button
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
              <TabPanel>
                <I18nTable />
              </TabPanel>
              <TabPanel>
                <I18nTable />
              </TabPanel>
              <TabPanel>
                <I18nTable />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
