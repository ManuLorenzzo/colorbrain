import moment from 'moment'
import React, { useState } from 'react'
import BarsChart from './Charts/Bars'
import './Statistics.css'
import tests from '../../Config/tests.json'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import RadarsChart from './Charts/Radar'

export default function Statistics({ data }) {
  const winPercent = () => {
    try {
      if (data && data.length) {
        const wins = data.filter(elem => !elem.tests.some(test => !test.passed))
        return (wins * 100) / data.length
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
        data.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf())
        data.forEach(elem => {
          const date = moment(elem.date)

          if (date.isSame(moment().format('YYYY-MM-DD'))) return

          if (lastDate.subtract(1, 'days').format('YYYY-MM-DD') === date.format('YYYY-MM-DD')) {
            consecutive++
            lastDate = date
          }
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
          if (!elem.tests[id].passed) return (obj['X'] = obj['X'] + 1)
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
      console.error()
    }
  }
  console.log(radarChartData(0))

  return (
    <section className="statistics">
      <div className="statistics__cards">
        <div className="statistics__card">
          <div>{data.length}</div>
          <div>Días jugados</div>
        </div>
        <div className="statistics__card">
          <div>{consecutiveDays()}</div>
          <div>Días consecutivos</div>
        </div>
        <div className="statistics__card">
          <div>{winPercent()}%</div>
          <div>Victorias</div>
        </div>
      </div>
      <div className="statistics__charts">
        <div className="statistics__chart">
          <Swiper spaceBetween={50} slidesPerView={1} onSlideChange={swiper => console.log(swiper)}>
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
    </section>
  )
}
