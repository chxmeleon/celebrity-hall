export const gifList = [...new Array(24)].map((item, idx) => {
  return {
    name: `ainti${idx + 2}`,
    src: `/public/gif/AINITOO/AINITOO${idx + 2}.gif`
  }
})
