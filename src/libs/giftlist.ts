import boat from '/gift/boat.webp'
import car from '/gift/car.webp'
import diamond from '/gift/diamond.webp'
import rose from '/room_gifts/rose.webp'
import fuzhou from '/room_gifts/fuzhou.webp'
import egg from '/room_gifts/egg.webp'
import pie from '/room_gifts/pie.webp'
import bag from '/room_gifts/bag.webp'
import treasure from '/room_gifts/treasure.webp'

export const giftList = [
  { name: 'rose', title: '玫瑰花束', value: 100, image: rose, game: true },
  { name: 'fuzhou', title: '符咒', value: 100, image: fuzhou, game: false },
  { name: 'egg', title: '砸蛋', value: 100, image: egg, game: false },
  { name: 'pie', title: '砸派', value: 100, image: pie, game: false },
  { name: 'bag', title: '吉祥福袋', value: 200, image: bag, game: true },
  {
    name: 'diamond',
    title: '頂級鑽石',
    value: 500,
    image: diamond,
    game: true
  },
  {
    name: 'treasure',
    title: '黃金寶箱',
    value: 1000,
    image: treasure,
    game: true
  },
  { name: 'car', title: '超級跑車', value: 2000, image: car, game: true },
  { name: 'boat', title: '豪華遊艇', value: 10000, image: boat, game: true },

]
