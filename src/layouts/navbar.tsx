import { FormattedMessage } from 'react-intl'
import { LinkButton } from '@/components/common/Button'

const linkLisetMapper = [
  [
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
    }
  ],
  [
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
]

export const NavbarTop = () => {
  return (
    <div className="flex relative z-10 justify-around items-center p-2 pt-1 pb-3 mt-10 w-full h-12 md:hidden">
      {linkLisetMapper[0].map((item, idx) => (
        <LinkButton key={idx} href={item.href} isTarget={false}>
          <div className="px-1 w-14 text-xs truncate">
            <FormattedMessage id={item.id} defaultMessage={item.default} />
          </div>
        </LinkButton>
      ))}
    </div>
  )
}

export const NavbarBottom = () => {
  return (
    <div className="flex relative z-50 justify-around items-center p-2 py-3 w-full h-12 md:hidden">
      {linkLisetMapper[1].map((item, idx) => (
        <LinkButton key={idx} href={item.href} isTarget={false}>
          <div className="px-1 w-14 text-xs truncate">
            <FormattedMessage id={item.id} defaultMessage={item.default} />
          </div>
        </LinkButton>
      ))}
    </div>
  )
}
