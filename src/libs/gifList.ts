const gonGif = [...new Array(16)].map((_val, idx) => {
  return {
    name: `gon${idx + 2}`,
    src: `/gif/GON/GON${idx + 2}.gif`
  }
})

const pigroGif = [...new Array(16)].map((_val, idx) => {
  return {
    name: `pigro${idx + 2}`,
    src: `/gif/PIGRO/PIGRO${idx + 2}.gif`
  }
})

const aintiGif = [...new Array(24)].map((_val, idx) => {
  return {
    name: `ainti${idx + 2}`,
    src: `/gif/AINITOO/AINITOO${idx + 2}.gif`
  }
})

const catGif = [...new Array(24)].map((_val, idx) => {
  return {
    name: `cat_${idx + 1}`,
    src: `/gif/Cat/${idx + 1}.gif`
  }
})

export const gifList = { ainti: aintiGif, gon: gonGif, pigro: pigroGif, cat: catGif }
