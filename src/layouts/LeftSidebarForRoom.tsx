import LogoImg from '@/assets/login_logo.webp'
import { LinkButton } from '@/components/common/Button'
import { FormattedMessage } from 'react-intl'
import { useQuery } from '@apollo/client'
import { GET_PROFILE } from '@/gql/profile'
import defaultAvatar from '/user.png'
import { useActionCable } from '@/contexts/ActionCableContext'
import { useEffect } from 'react'

const LeftSidebarForRoom = () => {
  const { data: user, refetch } = useQuery(GET_PROFILE)

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
    <div className="hidden md:flex flex-shrink-0 px-1.5 w-0 text-center md:py-5 md:px-7 md:w-44 border-r-[0.5px] border-r-theme-75">
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
                  <p className="truncate">{user?.profile?.nickname}</p>
                  <p className="pt-1 truncate text-theme-300 text-xs">
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
            <LinkButton href="/home/rooms" isTarget={false}>
              <div className="hidden md:block">
                <FormattedMessage id="layout.all" defaultMessage="Explore" />
              </div>
              <div className="w-full h-full md:hidden">
                <img
                  src="/icons/all.png"
                  alt="all icon"
                  className="w-7 h-7 object-fit"
                />
              </div>
            </LinkButton>
            <LinkButton href="/home/liverooms" isTarget={false}>
              <FormattedMessage
                id="layout.liverooms"
                defaultMessage="Live Hall"
              />
            </LinkButton>
            <LinkButton href="/home/mutualrooms" isTarget={false}>
              <FormattedMessage
                id="layout.mutualrooms"
                defaultMessage="Mutual Hall"
              />
            </LinkButton>
            <LinkButton href="/home/kgrooms" isTarget={false}>
              <FormattedMessage
                id="layout.kgrooms"
                defaultMessage="KG Hall"
              />
            </LinkButton>
            {/* <LinkButton href="/home/following" isTarget={false}> */}
            {/*   <FormattedMessage */}
            {/*     id="layout.following" */}
            {/*     defaultMessage="Following" */}
            {/*   /> */}
            {/* </LinkButton> */}
            <LinkButton href="/home/tables" isTarget={false}>
              <div className="hidden md:block">
                <FormattedMessage id="layout.tables" defaultMessage="Tables" />
              </div>
              <div className="w-full h-full md:hidden">
                <img
                  src="/icons/table.png"
                  alt="all icon"
                  className="w-7 h-7 object-fit"
                />
              </div>
            </LinkButton>
            <LinkButton href="/home/rankings/streamers" isTarget={false}>
              <div className="hidden md:block">
                <FormattedMessage
                  id="layout.rankings"
                  defaultMessage="Rankings"
                />
              </div>
              <div className="w-full h-full md:hidden">
                <img
                  src="/icons/rankings.png"
                  alt="all icon"
                  className="w-7 h-7 object-fit"
                />
              </div>
            </LinkButton>
            <LinkButton href="/home/streamers" isTarget={false}>
              <div className="hidden md:block">
                <FormattedMessage
                  id="layout.streamers"
                  defaultMessage="Streamers"
                />
              </div>
              <div className="w-full h-full md:hidden">
                <img
                  src="/icons/streamer.png"
                  alt="all icon"
                  className="w-7 h-7 object-fit"
                />
              </div>
            </LinkButton>
            {/* <LinkButton href="https://google.com/" isTarget={true}> */}
            {/*   <FormattedMessage */}
            {/*     id="layout.appdownload" */}
            {/*     defaultMessage="App Download" */}
            {/*   /> */}
            {/* </LinkButton> */}
          </div>
        </section>
      </div>
    </div>
  )
}

export default LeftSidebarForRoom
