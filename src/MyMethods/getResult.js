const addMatchToStatus = (status, id, alerts) => {
  try {
    if (alerts > 0) {
      status.push({
        id,
        result: 1,
      })
    } else {
      const index = status.findIndex(elem => elem.id === id && elem.result === 2)
      if (index !== -1) {
        status[index].result = 0
      }
      status.push({
        id,
        result: 1,
      })
    }
    return status
  } catch (err) {
    console.error(err)
  }
}

const addIncludedToStatus = (status, id, alerts) => {
  try {
    if (alerts > 0) {
      status.push({
        id,
        result: 2,
      })
    }
    return status
  } catch (err) {
    console.error(err)
  }
}

export default function getResult({ values, solution, colorsLength }) {
  try {
    if (values && solution && values?.length === solution?.length) {
      let alerts = Array(colorsLength)
        .fill(null)
        .map((el, index) => {
          const found = solution.filter(elem => elem === index + 1)
          return {
            id: index + 1,
            counter: found.length,
          }
        })
      let status = []
      values.forEach((value, i) => {
        const alertIndex = alerts.findIndex(elem => elem.id === value)
        if (alertIndex !== -1) {
          if (solution[i] === value) {
            status = addMatchToStatus(status, value, alerts[alertIndex].counter)
            alerts[alertIndex].counter = alerts[alertIndex].counter - 1
            return
          }
          if (solution.includes(value)) {
            status = addIncludedToStatus(status, value, alerts[alertIndex].counter)
            alerts[alertIndex].counter = alerts[alertIndex].counter - 1
            return
          }
        }
        return
      })
      status = status.filter(elem => elem.result)
      status.sort((a, b) => a.result - b.result)
      return status.length ? status : null
    } else throw new Error('No values or solution in getResult')
  } catch (err) {
    console.error(err)
    return null
  }
}
