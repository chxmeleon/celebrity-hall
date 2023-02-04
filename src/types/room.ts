import types from '@/types'

export type RoomProps = Exclude<
  types.GET_BACCARATROOMS['activeBaccaratRooms'],
  null
>[number]

