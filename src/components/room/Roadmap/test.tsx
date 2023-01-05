import { useState, useEffect } from 'react'

const bigRecord = () => {
  /* const [roadArray, setRoadArray] = useState< */
  /*   { record: string; className: string; index: number }[] */
  /* >([]) */
  /* const [currentColumn, setCurrentColumn] = useState(8) */
  /* const [currentRow, setCurrentRow] = useState(6) */
  /**/
  /* useEffect(() => { */
  /*   const newRoadArray: { record: string; className: string; index: number }[] = */
  /*     [] */
  /*   let lastRecord */
  /**/
  /*   for (let record of this.$store.state.game.currentRoom.winRecord) { */
  /*     lastRecord = */
  /*       roadArray[roadArray.length - 1] && */
  /*       roadArray[roadArray.length - 1].record */
  /*     if (record === 'p') { */
  /*       if (lastRecord === 'b') { */
  /*         setCurrentColumn(currentColumn + 1) */
  /*         setCurrentRow(1) */
  /*       } else if (lastRecord === 'p' && currentRow === 6) { */
  /*         setCurrentColumn(currentColumn + 1) */
  /*       } else { */
  /*         setCurrentColumn(currentColumn + Math.floor(currentRow / 6)) */
  /*         setCurrentRow((currentRow % 6) + 1) */
  /*       } */
  /*       newRoadArray.push({ */
  /*         record, */
  /*         className: 'player_circle', */
  /*         index: (currentColumn - 1) * 6 + currentRow - 1, */
  /*       }) */
  /*     } else if (record === 'b') { */
  /*       if (lastRecord === 'p') { */
  /*         setCurrentColumn(currentColumn + 1) */
  /*         setCurrentRow(1) */
  /*       } else if (lastRecord === 'b' && currentRow === 6) { */
  /*         setCurrentColumn(currentColumn + 1) */
  /*       } else { */
  /*         setCurrentColumn(currentColumn + Math.floor(currentRow / 6)) */
  /*         setCurrentRow((currentRow % 6) + 1) */
  /*       } */
  /*       newRoadArray.push({ */
  /*         record, */
  /*         className: 'banker_circle', */
  /*         index: (currentColumn - 1) * 6 + currentRow - 1, */
  /*       }) */
  /*     } else { */
  /*       if (lastRecord === 'b') { */
  /*         newRoadArray[newRoadArray.length - 1].className = 'banker_tie_circle' */
  /*       } else if (lastRecord === 'p') { */
  /*         newRoadArray[newRoadArray.length - 1].className = 'player_tie_circle' */
  /*       } else { */
  /*         setCurrentColumn(currentColumn + Math.floor(currentRow / 6)) */
  /*         setCurrentRow((currentRow % 6) + 1) */
  /*         newRoadArray.push({ */
  /*           record, */
  /*           className: 'tie_circle', */
  /*           index: (currentColumn - 1) * 6 + currentRow - 1, */
  /*         }) */
  /*       } */
  /*     } */
  /*   } */
  /**/
  /*   setRoadArray( */
  /*     currentColumn > 28 */
  /*       ? newRoadArray */
  /*           .filter((road) => road.index > (currentColumn - 20) * 6 - 1) */
  /*           .map((road) => ({ */
  /*             ...road, */
  /*             index: road.index - (currentColumn - 28) * 6, */
  /*           })) */
  /*       : newRoadArray */
  /*   ) */
  /* }, []) // empty array ensures the effect only runs */
  /**/
  /* return roadArray */
}
