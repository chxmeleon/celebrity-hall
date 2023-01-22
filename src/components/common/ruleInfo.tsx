import { clsx as cx } from 'clsx'
const gridMapper = {
  rows: {
    9: 'grid-rows-9',
    11: 'grid-rows-11',
    21: 'grid-rows-21'
  },
  cols: {
    2: 'grid-cols-2',
    6: 'grid-cols-6',
    7: 'grid-cols-7'
  },
  span: {
    0: '',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4'
  }
}

type RuleProps = {
  data: (string | string[])[][]
  rows: number
  cols: number
  span: number
}
export const RuleTable: React.FC<RuleProps> = ({ data, rows, cols, span }) => {
  return (
    <div
      className={cx(
        'min-w-[780px] text-sm grid text-center border border-theme-300/50 rounded-md rule-table',
        gridMapper?.rows[rows]
      )}
    >
      {data?.map((item, id) => {
        return (
          <div
            key={id}
            className={cx(
              'grid',
              gridMapper.cols[cols],
              id === 0
                ? 'bg-amber-500/80 text-theme-50 font-bold text-lg'
                : 'bg-amber-500/10'
            )}
          >
            {item.map((text, idx) => {
              if (idx === item.length - 1) {
                return (
                  <div
                    key={idx}
                    className={cx(
                      'flex justify-center items-center py-4 px-3 border-[1px] border-theme-300/50',
                      gridMapper.span[span]
                    )}
                  >
                    {typeof text === 'object' ? (
                      <div className="leading-8 text-left">
                        {text[0]} <br /> {text[1]}
                      </div>
                    ) : (
                      <div className="m-auto">{text}</div>
                    )}
                  </div>
                )
              }
              return (
                <div
                  key={idx}
                  className={cx(
                    'flex justify-center items-center py-4 px-2 border-[1px] border-theme-300/50'
                  )}
                >
                  {typeof text === 'object' ? (
                    <div className="leading-8 text-left">
                      {text[0]} <br /> {text[1]}
                    </div>
                  ) : (
                    <div className="m-auto">{text}</div>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
