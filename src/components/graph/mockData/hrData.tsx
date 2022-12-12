import aiMockData from './hr.json'

export const mockHr = () => {
  const mockValues: { stressLevel: number; date: string; comment: string }[] = []
  let latestDate = new Date(1970, 1, 1)
  const sampleTimeMs = 3600000

  Object.entries(aiMockData.value).forEach(([key, value]) => {
    const entryDate = new Date(parseInt(key, 10))
    if (entryDate.getTime() - latestDate.getTime() > sampleTimeMs) {
      mockValues.push({
        stressLevel: value,
        date: entryDate.toLocaleString('zh-Hans-CN').replace(',', ''),
        comment: '',
      })
      latestDate = entryDate
    }
  })

  return mockValues
}
