import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tests from '../Config/tests.json'
import { setReduxState, setReduxTests } from '../Redux/Ducks/stateDuck'
import { setReduxStatistics } from '../Redux/Ducks/statisticsDuck'
import { Buffer } from 'buffer'
import data from '../Config/data.json'
import moment from 'moment'
import { setReduxCookieData, setReduxShowCookiesModal } from '../Redux/Ducks/cookiesDuck'

export default function FillRedux() {
  const redux = useSelector(store => store)
  const reduxState = redux?.state
  const nowDate = moment().format('YYYY-MM-DD')

  const dispatch = useDispatch()
  useEffect(() => {
    const getTodaysResults = () => {
      try {
        const results = data?.find(elem => elem.date === nowDate)?.results
        if (!results || !results.length) throw Error('No results found')
        return results
      } catch (err) {
        console.error(err)
        return [
          [4, 2, 2, 1],
          [3, 1, 1, 5],
          [4, 5, 5, 6, 4],
        ]
      }
    }
    const generateState = () => {
      const results = getTodaysResults()
      dispatch(
        setReduxTests(
          tests?.map((elem, i) => {
            return {
              ...elem,
              history: [],
              passed: false,
              initialAttempts: elem.attempts,
              solution: results[i],
              date: nowDate,
              startTime: null,
              endTime: null,
            }
          })
        )
      )
    }
    try {
      if (reduxState && !reduxState.tests?.length) {
        const storage = window.localStorage.getItem('data')
        if (storage) {
          const decoded = JSON.parse(Buffer.from(storage, 'base64')?.toString('ascii') || '{}')
          if (
            decoded &&
            typeof decoded === 'object' &&
            Object.keys(decoded).length &&
            decoded.tests?.length &&
            decoded.tests[0].date === nowDate
          ) {
            return dispatch(setReduxState(decoded))
          }
          return generateState()
        }
        generateState()
      } else if (reduxState.tests[0]?.date !== nowDate) {
        generateState()
      } else {
        window.localStorage.setItem(
          'data',
          Buffer.from(JSON.stringify(reduxState)).toString('base64')
        )
      }
    } catch (err) {
      console.error(err)
    }
  }, [dispatch, reduxState, nowDate])

  useEffect(() => {
    if (redux.statistics && !redux.statistics.length) {
      const storage = window.localStorage.getItem('statistics')
      if (storage) {
        const decoded = JSON.parse(Buffer.from(storage, 'base64')?.toString('ascii') || '{}')
        if (decoded && typeof decoded === 'object' && Object.keys(decoded).length) {
          return dispatch(setReduxStatistics(decoded))
        }
      }
    } else {
      window.localStorage.setItem(
        'statistics',
        Buffer.from(JSON.stringify(redux.statistics)).toString('base64')
      )
    }
  }, [dispatch, redux])

  useEffect(() => {
    const showModal = () => dispatch(setReduxShowCookiesModal(true))
    try {
      if (Object.keys(redux?.cookies.data)?.length) {
        window.localStorage.setItem('cookiesSeen', true)
        window.localStorage.setItem('cookiesData', JSON.stringify(redux.cookies.data))
      }
      if (!Object.keys(redux?.cookies.data)?.length) {
        if (!window.localStorage.cookiesSeen) {
          showModal()
        } else {
          if (window.localStorage.cookiesData) {
            dispatch(setReduxCookieData(JSON.parse(window.localStorage.cookiesData)))
          } else {
            showModal()
          }
        }
      }
    } catch (err) {
      showModal()
      console.error(err)
    }
  }, [dispatch, redux?.cookies.data])

  useEffect(() => {
    try {
      const interval = setInterval(() => {
        const now = moment()
        if (now.hour() === 0 && now.minutes() === 0 && now.seconds() === 0) {
          dispatch(setReduxTests([]))
        }
      }, 1000)

      return () => clearInterval(interval)
    } catch (err) {
      console.error(err)
    }
  }, [dispatch])

  // const generateResults = () => {
  //   let i = 0
  //   let data = []
  //   let initialDate = moment()
  //   while (i < 10000) {
  //     data.push({
  //       date: initialDate.add(1, 'days').format('YYYY-MM-DD'),
  //       results: tests?.map(elem =>
  //         [...Array(elem.inputs)].fill(null).map(el => Math.ceil(Math.random() * elem.colors))
  //       ),
  //     })
  //     i++
  //   }
  //   console.log(data)
  // }

  // generateResults()

  return <></>
}
