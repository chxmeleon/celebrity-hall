import React from 'react'


interface TileProps {
  status: string
}
const Tile: React.FC<TileProps> = ({ status }) => {

  return (
    <div className="w-4 h-4">
      <div>{status}</div>
    </div>
  )

}



const fake = new Array(100)
console.log(fake);



const BigEyeRoad: React.FC = () => {
  return (
    <div className="flex flex-col flex-wrap">
      <Tile status={'B'} />
  </div>
  )
}

export default BigEyeRoad
