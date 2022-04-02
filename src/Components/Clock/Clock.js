import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'

// MY IMPORTS
import './Clock.css'
import easyToast from '../EasyToast/easyToast'
import getGameEndTime from '../../MyMethods/getGameEndTime'

export default function Clock({ label, startTime, endTime, gameClock = false, tests }) {
  const [time, setTime] = useState(null)

  const getDuration = useCallback(() => {
    try {
      if (!startTime) return null
      let diff = null
      if (!gameClock) {
        if (endTime) {
          diff = moment().startOf('day').seconds(moment(endTime).diff(startTime, 'seconds'))
        } else {
          diff = moment().startOf('day').seconds(moment().diff(startTime, 'seconds'))
        }
      } else {
        const gameEndTime = getGameEndTime(tests)
        if (gameEndTime) {
          diff = moment().startOf('day').seconds(moment(gameEndTime).diff(startTime, 'seconds'))
        }
      }
      if (!diff) return null
      return {
        h: diff.hours() === 0 ? null : diff.hours(),
        m: diff.minutes() === 0 ? null : diff.minutes(),
        s: diff.seconds() === 0 ? null : diff.seconds(),
      }
    } catch (error) {
      console.error()
      return null
    }
  }, [endTime, startTime, gameClock, tests])

  useEffect(() => {
    try {
      if (!time) {
        if (getDuration() === null) {
          const timeout = setTimeout(() => {
            setTime(null)
          }, 1000)
          return () => clearTimeout(timeout)
        } else {
          setTime(getDuration())
        }
      } else {
        const timeout = setTimeout(() => {
          setTime(getDuration())
        }, 1000)

        return () => clearTimeout(timeout)
      }
    } catch (err) {
      easyToast('error', 'Ha ocurrido un error con el tiempo del test')
      console.error(err)
    }
  }, [time, getDuration])

  return (
    <div className="clock">
      <div>{label}</div>
      <div>
        <span>
          {time ? (
            <>
              {time.h && time.h !== 0 && `${time.h}h`}{' '}
              {time.m && time.m !== (0 || 60) && `${time.m}m`}{' '}
              {time.s && time.s !== (0 || 60) && `${time.s}s`}
              {!time.s && !time.h && !time.m && '-'}
            </>
          ) : (
            '-'
          )}
        </span>
      </div>
    </div>
  )
}
