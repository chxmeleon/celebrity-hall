export const mapRankingData = ({ data, type }: { data: any[]; type: string }) => {
    const result: any[] = []
    data.forEach((item, index) => {
      switch (type) {
        case 'contribution':
          result.push({ ...item, point: item.contribution })
          break
        case 'win_points':
          result.push({ ...item, point: item.win_points })
          break
        case 'rounds':
          result.push({ ...item, point: item.rounds })
          break
        default:
          break
      }
    })
    return result
  }