import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ANNOUNCEMENTS } from '@/gql/announcements'
import { useSetup } from '@/contexts/SetupContext'
import Modal from '../common/Modal'

const NoticeModal: React.FC = () => {
  const { isShowNotice, closeNotice } = useSetup()
  const { data } = useQuery(GET_ANNOUNCEMENTS)
  const noticeData = useMemo(() => {
    if (data) {
      return data.annoncements.records
    }
    return []
  }, [data])

  return (
    <Modal
      isShow={isShowNotice}
      onClose={closeNotice}
      size="w-4/5 md:w-1/2 h-[79%] "
    >
      <div className="h-[90%] w-full pl-3 overflow-y-scroll">
        {noticeData.map(
          (item: {
            _typrename: string
            id: string
            content: string
            createdAt: string
          }) => {
            const date =
              item?.createdAt.slice(0, 10) + ' ' + item?.createdAt.slice(11, 16)
            return (
              <div
                className="py-4 px-3 m-auto mb-2 w-full rounded-md border md:py-6 md:px-5 md:w-5/6 border-theme-300/80 bg-theme-50/70"
                key={item.id}
              >
                <div className="flex justify-end pr-3 pb-2 font-medium">
                  <p>{date}</p>
                </div>
                <p className="my-3 tracking-wide leading-8 break-words">
                  {item.content}
                </p>
              </div>
            )
          }
        )}
      </div>
    </Modal>
  )
}

export default NoticeModal
