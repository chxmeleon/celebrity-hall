import { clsx as cx } from 'clsx'

 
type RuleProps = {
  data: string[][]
}
export const RuleTable: React.FC<RuleProps> = ({data}) => {
  return (

    <div className="grid grid-rows-11 text-center border border-theme-300/50 rounded-md rule-table">
      {data?.map((item, id) => {
        return (
          <div
            key={id}
            className={cx('grid grid-cols-6', id === 0 ? 'bg-amber-500/80 text-theme-50 font-bold text-lg': 'bg-amber-500/10')}
          >
            {item.map((text, idx) => {
              if (idx === 4) {
                return (
                  <div key={idx} className="px-2 py-4 col-span-2 border-[1px] border-theme-300/50 flex justify-center items-center">
                    {text}
                  </div>
                )
              }
              return (
                <div key={idx} className="px-2 py-4 border-[1px] border-theme-300/50 flex justify-center items-center">
                  {text}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
