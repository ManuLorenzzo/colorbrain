import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { countdown } from 'moment-countdown'

// MY IMPORTS
import './Clock.css'

export default function Clock() {
  const [time, setTime] = useState(null)

  useEffect(() => {
    try {
      const endOfDay = moment()
        .add(1, 'days')
        .set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .valueOf()

      const getTime = () => {
        const diff = moment.duration(moment(endOfDay).diff(moment()))
        return diff?._data
      }

      if (!time) {
        setTime(getTime())
      } else {
        const timeout = setTimeout(() => {
          setTime(getTime())
        }, 1)

        return () => clearInterval(timeout)
      }
    } catch (err) {
      console.error(err)
    }
  }, [time])

  return (
    time && (
      <div className="statistics-clock">
        <div>
          Próximo <b>ColorBrain</b> en
        </div>
        <span>
          {time.hours !== 0 && `${time.hours}h`}{' '}
          {time.minutes !== 0 && time.minutes !== 60 && `${time.minutes}m`}{' '}
          {time.seconds !== 0 && time.seconds !== 60 && `${time.seconds}s`}
        </span>
      </div>
    )
  )
}
