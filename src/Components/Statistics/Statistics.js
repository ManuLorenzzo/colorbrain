import moment from 'moment'
import React from 'react'
import BarsChart from './Charts/Bars'
import './Statistics.css'
import tests from '../../Config/tests.json'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import RadarsChart from './Charts/Radar'
import Clock from './Clock/Clock'

export default function Statistics({ data, state }) {
  const finished =
    !state?.tests?.some(test => !test.attempts && !test.passed) ||
    state?.tests?.some(test => !test.attempts && !test.passed)
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
          if (date.isSame(moment().format('YYYY-MM-DD'))) {
            return
          }

          if (lastDate.subtract(1, 'days').format('YYYY-MM-DD') === date.format('YYYY-MM-DD')) {
            consecutive++
            return (lastDate = date)
          }
          stop = true
          return
        })
        return consecutive
      }
      return 0
    } catch (err) {
      console.error(err)
      return 0
    }
  }

  const barChartData = id => {
    try {
      if (data && data.length && id != null) {
        let obj = {}
        Array(tests[id].attempts + 1)
          .fill(null)
          .forEach((elem, i) => (obj[i === tests[id].attempts ? 'X' : i + 1] = 0))

        data.forEach(elem => {
          if (!elem.tests[id].passed) {
            console.log('NO LO HA PASADO TEST ', id)
            return (obj['X'] = obj['X'] + 1)
          }
          const tries = tests[id].attempts - elem.tests[id].attempts
          if (tries === 0) obj[tests[id].attempts] = obj[tests[id].attempts] + 1
          else
            obj[tests[id].attempts - elem.tests[id].attempts] =
              obj[tests[id].attempts - elem.tests[id].attempts] + 1
        })
        return Object.entries(obj).map(([key, value]) => {
          return { name: key, veces: value }
        })
      }
    } catch (err) {
      console.error(err)
      return null
    }
  }

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

  console.log('1', barChartData(0))
  console.log('2', barChartData(1))
  console.log('3', barChartData(2))

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
                      <h5>Intentos</h5>
                      <BarsChart data={barChartData(i)} />
                      <h5>Uso de cada color</h5>
                      <RadarsChart data={radarChartData(i)} />
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
