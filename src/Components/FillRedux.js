import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tests from '../Config/tests.json'
import { setReduxState, setReduxTests } from '../Redux/Ducks/stateDuck'
import { Buffer } from 'buffer'
import moment from 'moment'

export default function FillRedux() {
  const reduxState = useSelector(store => store.state)
  const dispatch = useDispatch()
  useEffect(() => {
    const generateState = () =>
      dispatch(
        setReduxTests(
          tests?.map(elem => {
            return {
              ...elem,
              history: [],
              passed: false,
              initialAttempts: elem.attempts,
              solution: [...Array(elem.inputs)]
                .fill(null)
                .map(el => Math.ceil(Math.random() * elem.colors)),
            }
          })
        )
      )
    if (reduxState && !reduxState.tests?.length) {
      const storage = window.localStorage.getItem('data')
      if (storage) {
        const decoded = JSON.parse(Buffer.from(storage, 'base64')?.toString('ascii') || '{}')
        if (
          decoded &&
          typeof decoded === 'object' &&
          Object.keys(decoded).length &&
          decoded.tests?.length &&
          false
        ) {
          console.log('ENTRO IFFF')
          return dispatch(setReduxState(decoded))
        }
        return generateState()
      }
      generateState()
    } else {
      window.localStorage.setItem(
        'data',
        Buffer.from(JSON.stringify(reduxState)).toString('base64')
      )
    }
  }, [dispatch, reduxState])

  /*
  const generateResults = () => {
    let i = 0
    let data = []
    let initialDate = moment()
    while (i < 1000) {
      data.push({
        date: initialDate.add(1, 'days').format('YYYY-MM-DD'),
        results: tests?.map(elem =>
          [...Array(elem.inputs)].fill(null).map(el => Math.ceil(Math.random() * elem.colors))
        ),
      })
      i++
    }
    console.log(data)
  }

  generateResults()
*/
  return <></>
}
