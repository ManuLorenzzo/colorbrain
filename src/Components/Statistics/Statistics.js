import moment from 'moment'
import React from 'react'
import BarsChart from './Charts/Bars'
import './Statistics.css'
import tests from '../../Config/tests.json'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import RadarsChart from './Charts/Radar'
import Clock from './Clock/Clock'
import useWindowDimensions from '../Hooks/useWindowDimensions'
import getGameEndTime from '../../MyMethods/getGameEndTime'
import secondsToString from '../../MyMethods/secondsToString'
import RechartPie from './Charts/Pie'

export default function Statistics({ data, state }) {
  const finished =
    state?.tests?.some(test => !test.passed && test.history.length === test.initialAttempts) ||
    !state?.tests?.some(test => !test.passed)
  const { width } = useWindowDimensions()

  const hasLost = state?.tests?.some(test => !test.passed)

  const winPercent = () => {
    try {
      if (data && data.length) {
        const wins = data.filter(elem => elem.tests.some(test => test.passed))
        const value = (wins.length * 100) / data.length
        if (typeof value === 'number') {
          return value.toFixed(2)
        } else return 0
      }
      return 0
    } catch (err) {
      console.error(err)
      return 0
    }
  }

  const consecutiveDays = () => {
    try {
      if (data && data.length) {
        let consecutive = 0
        let lastDate = moment()
        let stop = false
        data.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf())
        data.forEach(elem => {
          const date = moment(elem.date)
          if (stop) return

          if (
            date.isSame(moment().format('YYYY-MM-DD')) ||
            lastDate.subtract(1, 'days').format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
          ) {
            consecutive++
            return (lastDate = date)
          }
          stop = true
          return
        })
        return consecutive === 1 ? 0 : consecutive
      }
      return 0
    } catch (err) {
      console.error(err)
      return 0
    }
  }

  const averageTime = () => {
    try {
      if (data && data.length) {
        let myData = data.filter(elem => elem.tests.some(test => test.startTime && test.endTime))
        if (myData.length) {
          let times = []
          myData.forEach(elem => {
            const gameTime = getGameEndTime(elem.tests, true)
            if (gameTime) times.push(gameTime)
            return
          })
          if (times.length) {
            const averageTime = times.reduce((a, b) => a + b, 0) / times.length
            const momentTime = moment.duration(averageTime * 1000)
            return secondsToString(momentTime)
          }
        }
      }
      return '-'
    } catch (err) {
      console.error(err)
      return '-'
    }
  }

  const averageTestTime = testId => {
    try {
      if (data && data.length) {
        let times = []
        const filteredTests = data.map(elem => elem.tests.find(elem => elem.id === testId))
        filteredTests.forEach(
          elem =>
            elem.startTime &&
            elem.endTime &&
            times.push(moment(elem.endTime).diff(elem.startTime, 'seconds'))
        )
        if (times.length) {
          const averageTime = times.reduce((a, b) => a + b, 0) / times.length
          const momentTime = moment.duration(averageTime * 1000)
          return secondsToString(momentTime)
        }
      }
      return null
    } catch (err) {
      console.error(err)
      return null
    }
  }

  const pieChartData = id => {
    try {
      if (data && data.length && id != null) {
        let obj = {}
        Array(tests[id].attempts + 1)
          .fill(null)
          .forEach((elem, i) => (obj[i === tests[id].attempts ? 'Fallo' : i + 1] = 0))

        data.forEach(elem => {
          if (!elem.tests[id].passed) return (obj['Fallo'] = obj['Fallo'] + 1)

          const tries = tests[id].attempts - elem.tests[id].attempts
          if (tries === 0) obj[tests[id].attempts] = obj[tests[id].attempts] + 1
          else
            obj[tests[id].attempts - elem.tests[id].attempts] =
              obj[tests[id].attempts - elem.tests[id].attempts] + 1
        })
        let final = []
        Object.entries(obj).forEach(([key, value]) => {
          if (!value) return
          final.push({ name: key, value: Math.round((value * 100) / data.length) })
        })
        return final
      }
    } catch (err) {
      console.error(err)
      return null
    }
  }

  // const barChartData = id => {
  //   try {
  //     if (data && data.length && id != null) {
  //       let obj = {}
  //       Array(tests[id].attempts + 1)
  //         .fill(null)
  //         .forEach((elem, i) => (obj[i === tests[id].attempts ? 'X' : i + 1] = 0))

  //       data.forEach(elem => {
  //         if (!elem.tests[id].passed) return (obj['X'] = obj['X'] + 1)

  //         const tries = tests[id].attempts - elem.tests[id].attempts
  //         if (tries === 0) obj[tests[id].attempts] = obj[tests[id].attempts] + 1
  //         else
  //           obj[tests[id].attempts - elem.tests[id].attempts] =
  //             obj[tests[id].attempts - elem.tests[id].attempts] + 1
  //       })
  //       return Object.entries(obj).map(([key, value]) => {
  //         return { name: key, Porcentaje: Math.round((value * 100) / data.length) }
  //       })
  //     }
  //   } catch (err) {
  //     console.error(err)
  //     return null
  //   }
  // }

  const radarChartData = id => {
    try {
      if (data && data.length) {
        const mapper = {
          1: 'Verde',
          2: 'Azul',
          3: 'Rojo',
          4: 'Amarillo',
          5: 'Morado',
          6: 'Marrón',
        }
        const obj = {}
        data.forEach(elem => {
          elem.tests[id].history.forEach(his => {
            his.values.forEach(value => {
              obj[mapper[value]] = obj[mapper[value]] ? obj[mapper[value]] + 1 : 1
            })
          })
        })
        return Object.entries(obj).map(([key, value]) => {
          return { name: key, veces: value }
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="statistics">
      {data && data.length > 0 && finished && (
        <div className={hasLost ? 'statistics__finished--lost' : 'statistics__finished'}>
          {hasLost ? 'Has fallado' : 'Has resuelto'} el ColorBrain de hoy
        </div>
      )}
      <Clock />
      <div className="statistics__cards">
        <div className="statistics__card">
          <div>{data.length}</div>
          <div>días jugados</div>
        </div>
        <div className="statistics__card">
          <div>{consecutiveDays()}</div>
          <div>días consecutivos</div>
        </div>
        <div className="statistics__card">
          <div>{winPercent()}%</div>
          <div>Victorias</div>
        </div>
        <div className="statistics__card">
          <div>{averageTime()}</div>
          <div>Tiempo medio total</div>
        </div>
      </div>
      {data && data.length > 0 && (
        <div className="statistics__charts">
          <div className="statistics__chart">
            <Swiper spaceBetween={50} slidesPerView={1}>
              {tests &&
                tests.length &&
                tests.map((elem, i) => {
                  return (
                    <SwiperSlide style={{ cursor: 'grab' }} key={i}>
                      <div className="stadistics__test-selected">
                        <h3>TEST {i + 1}</h3>
                        <h6>Desliza para ver otros tests</h6>
                      </div>
                      <div className="statistics__average-test-time">
                        Tiempo medio: <span>{averageTestTime(i)}</span>
                      </div>
                      <RechartPie data={pieChartData(i)} title="Intentos" />
                      {/* <BarsChart data={barChartData(i)} /> */}
                      {width < 1200 && (
                        <>
                          <h5>Uso de cada color</h5>
                          <RadarsChart data={radarChartData(i)} />
                        </>
                      )}
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </div>
        </div>
      )}
      {(!data || !data.length > 0) && (
        <div className="statistics__charts">
          <div className="statistics__no-values">
            Juega al menos una partida para tener estadísticas. ¡Suerte!
          </div>
        </div>
      )}
    </section>
  )
}
