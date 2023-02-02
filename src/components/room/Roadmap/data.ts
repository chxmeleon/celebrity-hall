export const askMapper = [
  {
    contentId: 'common.simpleDealer',
    default: 'Dealer',
    className: 'text-red-600',
    value: 'dealer_count'
  },
  {
    contentId: 'common.simplePlayer',
    default: 'Player',
    className: 'text-blue-600',
    value: 'player_count'
  },
  {
    contentId: 'common.simpleTie',
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

export const askMapperMobile = [
  {
    contentId: 'common.playerAsk',
    default: 'Player Ask',
    className: 'brightness-50 text-blue-300 pl-1 bg-blue-600',
    onClick: () => null
  },
  {
    contentId: 'common.totalCount',
    default: 'Total',
    className: 'text-theme-300',
    value: 'total_count'
  },
  {
    contentId: 'common.simpleDealer',
    default: 'Dealer',
    className: 'text-red-400',
    value: 'dealer_count'
  },
  {
    contentId: 'common.simplePlayer',
    default: 'Player',
    className: 'text-blue-400',
    value: 'player_count'
  },
  {
    contentId: 'common.simpleTie',
    default: 'Tie',
    className: 'text-teal-400',
    value: 'tie_count'
  },
  {
    contentId: 'common.dealerPair',
    default: 'Dealer Pair',
    className: 'text-red-400',
    value: 'dealer_pair_count'
  },
  {
    contentId: 'common.playerPair',
    default: 'Player Pair',
    className: 'text-blue-400',
    value: 'player_pair_count'
  },
  {
    contentId: 'common.dealerAsk',
    default: 'Dealer Ask',
    className: 'text-red-100 bg-red-600 brightness-50 pl-1',
    onClick: () => null
  }
]

export type RoadTileProps = {
  className: string
  translationId: string
}

export const fullRecordMapping: { [key: string]: RoadTileProps } = {
  dealer: {
    className: 'bg-red-600',
    translationId: 'common.simpleDealer'
  },
  player: {
    className: 'bg-blue-600',
    translationId: 'common.simplePlayer'
  },
  tie: { className: 'bg-teal-600', translationId: 'common.simpleTie' }
}

export const roadTileMapping: { [key: string]: RoadTileProps } = {
  dealer: {
    className: 'bg-red-600',
    translationId: 'common.simpleDealer'
  },
  player: {
    className: 'bg-blue-600',
    translationId: 'common.simplePlayer'
  },
  tie: { className: 'bg-teal-600', translationId: 'common.simpleTie' }
}

export const outlineTileMapping: { [key: string]: RoadTileProps } = {
  dealer: {
    className: 'border-red-600',
    translationId: 'common.simpleDealer'
  },
  player: {
    className: 'border-blue-600',
    translationId: 'common.simplePlayer'
  },
  tie: {
    className: 'border-teal-600',
    translationId: 'common.simpleTie'
  }
}
