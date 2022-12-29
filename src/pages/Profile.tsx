import { FormattedMessage } from "react-intl";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export const Info: React.FC<{ id: string; data: number; title: string }> = ({
  id,
  data,
  title,
}) => {
  return (
    <div className="border-l-[2px] border-[#6F6F6F] pl-[15px] my-[30px]">
      <div>
        <FormattedMessage id={id} defaultMessage={title} />
      </div>
      <div className="text-[#FFEC66] sm:text-[32px] font-bold">{data}</div>
    </div>
  );
};

export const Button: React.FC<{
  iconId: string;
  title: string;
  id: string;
}> = ({ iconId, title, id }) => {
  return (
    <button className="flex items-center justify-center bg-[#303030] rounded-[30px] w-[140px] h-[30px] mb-[19px]">
      <div className={`${iconId} text-lg mr-[6px]`} />
      <div className="text-[13px]">
        <FormattedMessage id={id} defaultMessage={title} />
      </div>
    </button>
  );
};

export const I18nTab: React.FC<{
  title: string;
  id: string;
}> = ({ title, id }) => {
  return (
    <Tab
      className="bg-[#303030] sm:w-[213px] sm:h-[51px] sm:mr-[6px] rounded-t-[20px]"
      _selected={{ bg: "#505050" }}
    >
      <FormattedMessage id={id} defaultMessage={title} />
    </Tab>
  );
};

export const I18nTable: React.FC<{
  data?: any;
}> = ({ data }) => {
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
        <Tbody></Tbody>
      </Table>
    </TableContainer>
  );
};

const Profile: React.FC = () => {
  return (
    <div className="sm:w-[1226px] m-auto sm:mt-[30px]">
      <div className="flex items-center">
        <div className="sm:w-[119px] sm:h-[119px] w-[18px] h-[18px] i-heroicons-user-circle-solid" />
        <div className="sm:ml-[50px] text-[40px]">XXXX</div>
        <div className="sm:ml-[100px]">
          <Info id="profile.info.points" data={100000000} title="上下分" />
          <Info id="profile.info.betting" data={0} title="有效投注" />
        </div>
        <div className="sm:ml-[80px]">
          <Info id="profile.info.dividend" data={0} title="紅利" />
          <Info id="profile.info.balance" data={100000000} title="餘額" />
        </div>
        <div className="sm:ml-[220px]">
          <Button
            iconId="i-mdi-file-edit-outline"
            id="profile.button.edit"
            title="修改暱稱"
          />
          <Button
            iconId="i-mdi-onepassword"
            title="修改密碼"
            id="profile.button.password"
          />
          <Button
            iconId="i-heroicons-arrow-right-on-rectangle-solid"
            title="帳號登出"
            id="profile.button.logout"
          />
        </div>
      </div>
      <div>
        <Tabs variant="unstyled">
          <TabList>
            <I18nTab title="上下紀錄" id="profile.button.updown" />
            <I18nTab title="下注紀錄" id="profile.button.bet" />
            <I18nTab title="送禮紀錄" id="profile.button.gift" />
          </TabList>
          <TabPanels className="bg-[#505050] sm:min-h-[500px]">
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
  );
};

export default Profile;
