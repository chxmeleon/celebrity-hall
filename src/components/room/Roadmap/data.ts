export const askMapper = [
  {
    contentId: 'common.dealer',
    default: 'Dealer',
    className: 'text-red-600',
    value: 'dealer_count'
  },
  {
    contentId: 'common.player',
    default: 'Player',
    className: 'text-blue-600',
    value: 'player_count'
  },
  {
    contentId: 'common.tie',
    default: 'Tie',
    className: 'text-teal-600',
    value: 'tie_count'
  },
  {
    contentId: 'common.dealerPair',
    default: 'Dealer Pair',
    className: 'text-red-600',
    value: 'dealer_pair_count'
  },
  {
    contentId: 'common.playerPair',
    default: 'Player Pair',
    className: 'text-blue-600',
    value: 'player_pair_count'

  },
  {
    contentId: 'common.totalCount',
    default: 'Total',
    className: 'text-amber-600',
    value: 'total_count'
  },
  {
    contentId: 'common.dealerAsk',
    default: 'Dealer Ask',
    className: 'text-red-600',
    roundStyle: 'bg-red-600',
    borderStyle: 'border-red-600 border-2',
    onClick: () => null
  },
  {
    contentId: 'common.playerAsk',
    default: 'Player Ask',
    className: 'text-blue-600',
    roundStyle: 'bg-blue-600',
    borderStyle: 'border-blue-600 border-2',
    onClick: () => null
  }
]

export type MapperData = {
  className: string
  contentId: string
}

export type MapperProps = {
  b: MapperData
  p: MapperData
  t: MapperData
}

export const fullRecordMapper: any = {
  b: { className: 'bg-red-600', contentId: 'screens.baccaratRoom.dealer' },
  p: { className: 'bg-blue-600', contentId: 'screens.baccaratRoom.player' },
  t: { className: 'bg-teal-600', contentId: 'screens.baccaratRoom.tie' }
}

export const outlineRecordMapper: any = {
  b: { className: 'border-red-600', contentId: 'screens.baccaratRoom.dealer' },
  p: { className: 'border-blue-600', contentId: 'screens.baccaratRoom.player' },
  t: { className: 'border-teal-600', contentId: 'screens.baccaratRoom.tie' }
}
