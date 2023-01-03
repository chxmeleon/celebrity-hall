import CustomModal from '@/hooks/useModal'
import { GET_ANNOUNCEMENTS } from '@/gql/announcements'
import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

const NoticeModal = () => {
  const { data } = useQuery(GET_ANNOUNCEMENTS)
  const noticeData = useMemo(() => {
    if (data) {
      return data.annoncements.records
    }
    return []
  }, [data])

  return (
    <CustomModal>
      {noticeData.map(
        (item: { _typrename: string; id: string; content: string }) => {
          return (
            <div key={item.id}>
              <p>{item.id}</p>
              <p>{item.content}</p>
            </div>
          )
        }
      )}
    </CustomModal>
  )
}

export default NoticeModal
