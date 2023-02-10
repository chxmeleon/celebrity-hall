import LogoImg from '@/assets/login_logo.webp'
import { LinkButton } from '@/components/common/Button'
import { FormattedMessage, useIntl } from 'react-intl'
import { useQuery } from '@apollo/client'
import { GET_PROFILE } from '@/gql/profile'
import defaultAvatar from '/user.png'
import { useActionCable } from '@/contexts/ActionCableContext'
import { useEffect } from 'react'
import { linkLisetMapper } from './LeftSidebar'
import { Tooltip } from '@material-tailwind/react'

const LeftSidebarForRoom = () => {
  const { data: user, refetch } = useQuery(GET_PROFILE)
  const { formatMessage } = useIntl()

  useEffect(() => {
    refetch()
  }, [refetch])

  const { cable } = useActionCable()

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'WalletChannel' },
      {
        received: (data) => {
          if (data) {
            refetch()
          }
        }
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [cable, refetch])

  return (
    <div className="hidden flex-shrink-0 px-1.5 w-0 text-center md:flex md:py-5 md:px-7 md:w-44 border-r-[0.5px] border-r-theme-75">
      <div className="mx-auto w-full">
        <section className="hidden pb-6 w-full md:block">
          <div className="flex">
            <img src={LogoImg} alt="logo image" className="m-auto w-24" />
          </div>
          {user?.profile !== null ? (
            <div className="flex justify-between items-center pt-3 w-full">
              <div className="pl-2 w-1/2">
                <div className="flex overflow-hidden w-11 h-11 rounded-full">
                  <img
                    src={user?.profile?.avatar ?? defaultAvatar}
                    alt="user avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="m-auto w-2/3 h-11 text-sm">
                <div className="m-auto w-2/3 text-left">
                  <p className="h-5 truncate">
                    {user?.profile?.nickname ?? user?.profile?.username}
                  </p>
                  <p className="pt-1 text-xs truncate text-theme-300">
                    {user?.profile?.balance}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[56px]"></div>
          )}
        </section>
        <hr className="hidden border-t md:block border-t-theme-75" />
        <section className="my-2 w-full h-[350px]">
          <div className="flex flex-col justify-evenly w-full h-full">
            {linkLisetMapper.map((item, idx) => (
              <LinkButton key={idx} href={item.href} isTarget={false}>
                <div className="hidden md:block">
                  <FormattedMessage
                    id={item.id}
                    defaultMessage={item.default}
                  />
                </div>
                <div className="w-full h-full md:hidden">
                  <Tooltip
                    content={formatMessage({
                      id: item.id,
                      defaultMessage: item.default
                    })}
                    placement="bottom"
                    className="relative z-40 py-0.5 px-1.5 mt-1.5 rounded-sm pointer-events-none text-[11px]"
                  >
                    <img
                      src={item.src}
                      alt="mobile icon image"
                      className="w-7 h-7 object-fit"
                    />
                  </Tooltip>
                </div>
              </LinkButton>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default LeftSidebarForRoom
