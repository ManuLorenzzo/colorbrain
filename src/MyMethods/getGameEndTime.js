import moment from 'moment'

export default function getGameEndTime(tests, getSeconds = false) {
  try {
    let totalTime = 0
    const firstTest = tests.find(test => test.id === 0)
    tests.forEach(test => {
      if (test.startTime && test.endTime) {
        const diff = moment(test.endTime).diff(test.startTime, 'seconds')
        totalTime += diff
      } else if (test.startTime) {
        const diff = moment().diff(test.startTime, 'seconds')
        totalTime += diff
      }
    })
    if (getSeconds) return totalTime
    if (firstTest.startTime) {
      const endTime = moment(firstTest.startTime).add(totalTime, 'seconds')
      return endTime.valueOf()
    }
    return null
  } catch (err) {
    console.error(err)
    return null
  }
}
