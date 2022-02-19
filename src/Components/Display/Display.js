import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Attempts from '../Attempts/Attempts'
import History from '../History/History'
import InputRow from '../InputRow/InputRow'
import Score from '../Score/Score'
import './Display.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import {
  setReduxInputValues,
  setReduxScrollTo,
  setReduxSelectedTest,
} from '../../Redux/Ducks/stateDuck'
import easyToast from '../EasyToast/easyToast'

export default function Display() {
  const state = useSelector(store => store.state)
  const dispatch = useDispatch()
  const test = state?.tests[state.selectedTest]

  const onSlideChange = swiper => {
    dispatch(setReduxSelectedTest(swiper?.activeIndex))
    dispatch(
      setReduxInputValues([...Array(state?.tests[swiper?.activeIndex]?.inputs || 4)].fill(null))
    )
  }

  useEffect(() => {
    try {
      if (state?.scrollTo) {
        if (state.tests.find(elem => elem.id === state.scrollTo)) {
          const swiper = document.querySelector('.swiper')?.swiper
          swiper?.slideNext()
          dispatch(setReduxScrollTo(null))
        }
      }
    } catch (err) {
      console.error(err)
      easyToast('error', 'Ha ocurrido un error, deslice a la izquierda manualmente')
    }
  }, [state?.scrollTo, dispatch, state.tests])

  return (
    <section className="display">
      <Swiper spaceBetween={50} slidesPerView={1} onSlideChange={swiper => onSlideChange(swiper)}>
        {state?.tests
          ?.filter((test, i) => test.id === 0 || test.passed || state.tests[i - 1]?.passed)
          .map((elem, i) => {
            return (
              <SwiperSlide style={{ cursor: 'grab' }} key={i} className="display__swiper">
                <Attempts test={test} selectedTest={state?.selectedTest + 1} />
                <History test={test} />
                {!test?.passed && test?.attempts > 0 && <InputRow state={state} test={test} />}
                <Score state={state} test={test} />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </section>
  )
}
