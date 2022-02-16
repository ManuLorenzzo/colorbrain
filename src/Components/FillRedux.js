import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tests from '../Config/tests.json'
import { setReduxTests } from '../Redux/Ducks/stateDuck'

export default function FillRedux() {
  const reduxState = useSelector(store => store.state)
  const dispatch = useDispatch()
  useEffect(() => {
    if (reduxState && !reduxState.tests?.length) {
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
    } else {
      console.log('No entro')
    }
  }, [dispatch, reduxState])

  return <></>
}
