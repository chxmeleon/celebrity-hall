import LogoImg from '@/assets/login_logo.webp'
import { LinkButton } from '@/components/common/Button'
import { FormattedMessage, useIntl } from 'react-intl'
import defaultAvatar from '/user.png'
import { useWallet } from '@/hooks/profile'
import { Tooltip } from '@material-tailwind/react'

const LeftSidebar = () => {
  const { user } = useWallet()
  const { formatMessage } = useIntl()
  
  const linkLisetMapper = [
    {
      href: '/home/rooms/all',
      id: 'layout.all',
      default: 'Explore',
      src: '/icons/all.png'
    },
    {
      href: '/home/rooms/live',
      id: 'layout.liverooms',
      default: 'Live Hall',
      src: '/icons/live.png'
    },
    {
      href: '/home/rooms/interaction',
      id: 'layout.mutualrooms',
      default: 'Mutual Hall',
      src: '/icons/mutual.png'
    },
    {
      href: '/home/rooms/kg',
      id: 'layout.kgrooms',
      default: 'KG Hall',
      src: '/icons/KG.png'
    },
    {
      href: '/home/tables',
      id: 'layout.tables',
      default: 'Tables',
      src: '/icons/table.png'
    },
    {
      href: '/home/rankings/streamers',
      id: 'layout.rankings',
      default: 'Rankings',
      src: '/icons/rankings.png'
    },
    {
      href: '/home/streamers',
      id: 'layout.streamers',
      default: 'Streamers',
      src: '/icons/streamer.png'
    }
  ]

  return (
    <div className="flex flex-shrink-0 px-1.5 w-14 h-full text-center md:py-5 md:px-7 md:w-44 border-r-[0.5px] border-r-theme-75">
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
                  <p className="truncate">{user?.profile?.nickname ?? user?.profile?.username}</p>
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

        <section className="my-2 w-full h-[400px] md:h-[350px]">
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
                    className="relative z-40 pointer-events-none px-1.5 py-0.5 text-[11px] mt-1.5 rounded-sm"
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

export default LeftSidebar
