import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ANNOUNCEMENTS } from '@/gql/announcements'
import { useSetup } from '@/contexts/SetupContext'

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
    <div
      className={`${isShowNotice ? 'block' : 'hidden'} absolute w-full h-full`}
    >
      <div
        onClick={closeNotice}
        className="flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 justify-center items-center w-full h-full bg-black/30 backdrop-blur-sm"
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="p-1 md:p-6 m-auto w-4/5 md:w-1/2 h-[79%] bg-gradient-to-br rounded-md border border-theme-300/50 from-theme-50/75 via-theme-75/90 to-theme-50/50 backdrop-blur-md"
        >
          <div className="flex justify-end w-full h-10">
            <button
              onClick={closeNotice}
              className="text-2xl i-heroicons-x-circle"
            ></button>
          </div>
          <div className="h-[90%] w-full pl-3 overflow-y-scroll">
            {noticeData.map(
              (item: {
                _typrename: string
                id: string
                content: string
                createdAt: string
              }) => {
                const date =
                  item?.createdAt.slice(0, 10) +
                  ' ' +
                  item?.createdAt.slice(11, 16)
                return (
                  <div
                    className="py-4 px-3 m-auto mb-2 w-full rounded-md border md:py-6 md:px-5 md:w-5/6 border-theme-300/80 bg-theme-50/70"
                    key={item.id}
                  >
                    <div className="flex justify-end pr-3 pb-2 font-medium">
                      <p>{date}</p>
                    </div>
                    <p className="my-3 tracking-wide leading-8 break-words">{item.content}</p>
                  </div>
                )
              }
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoticeModal
