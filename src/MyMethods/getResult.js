const addMatchToStatus = (status, id, alerts) => {
  console.log('ENTRO EN addMatch. id -> ', id, ' alerts -> ', alerts, ' status -> ', status)
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
    console.log({ status }, 'Retorno status en addMatch')
    return status
  } catch (err) {
    console.error(err)
  }
}

const addIncludedToStatus = (status, id, alerts) => {
  console.log('ENTRO EN included. id -> ', id, ' alerts -> ', alerts, ' status -> ', status)
  try {
    if (alerts > 0) {
      status.push({
        id,
        result: 2,
      })
    }
    console.log({ status }, 'Retorno status en addMatch')
    return status
  } catch (err) {
    console.error(err)
  }
}

export default function getResult({ values, solution }) {
  console.log({ values, solution })
  try {
    if (values && solution && values?.length === solution?.length) {
      let alerts = solution.map((el, index) => {
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
            console.log('EL COLOR ', value, 'HA HECHO MATCH EN LA SECUENCIA EN LA POSICIÓN', i)
            status = addMatchToStatus(status, value, alerts[alertIndex].counter)
            console.log('STATUS: ', status)
            alerts[alertIndex].counter = alerts[alertIndex].counter - 1
            return
          }
          if (solution.includes(value)) {
            console.log('EL COLOR ', value, 'ESTÁ INCLUÍDO EN LA SECUENCIA')
            status = addIncludedToStatus(status, value, alerts[alertIndex].counter)
            console.log('STATUS: ', status)
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
