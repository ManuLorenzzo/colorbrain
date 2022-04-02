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
import Clock from '../Clock/Clock'
import getGameEndTime from '../../MyMethods/getGameEndTime'

export default function Display() {
  const state = useSelector(store => store.state)
  const dispatch = useDispatch()
  const test = state?.tests[state.selectedTest]
  const swiper = document.querySelector('.swiper')?.swiper
  const gameStart = state?.tests?.find(elem => elem.id === 0)?.startTime

  const onSlideChange = swiper => {
    dispatch(setReduxSelectedTest(swiper?.activeIndex))
    const nextUnsolvedTest = state?.tests?.find(elem => !elem.passed && elem.attempts)
    if (state?.inputValues?.length !== nextUnsolvedTest?.inputs) {
      dispatch(
        setReduxInputValues([...Array(state?.tests[swiper?.activeIndex]?.inputs || 4)].fill(null))
      )
    }
  }

  useEffect(() => {
    try {
      if (state?.scrollTo) {
        if (state.tests.find(elem => elem.id === state.scrollTo)) {
          swiper?.slideNext()
          dispatch(setReduxScrollTo(null))
        }
      }
    } catch (err) {
      console.error(err)
      easyToast('error', 'Ha ocurrido un error, deslice a la izquierda manualmente')
    }
  }, [state?.scrollTo, dispatch, state.tests, swiper])

  useEffect(() => {
    if (swiper?.activeIndex !== state?.selectedTest) {
      swiper?.slideTo(state?.selectedTest)
    }
  }, [swiper, state?.selectedTest])

  return (
    <section className="display">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={swiper => onSlideChange(swiper)}
        initialSlide={state?.selectedTest}
      >
        {state?.tests
          ?.filter((test, i) => test.id === 0 || test.passed || state.tests[i - 1]?.passed)
          .map((elem, i) => {
            return (
              <SwiperSlide style={{ cursor: 'grab' }} key={i} className="display__swiper">
                <div className="display__clocks">
                  <Clock
                    label="Tiempo de juego"
                    startTime={gameStart}
                    gameClock={true}
                    tests={state?.tests}
                  />
                  <Clock
                    label="Tiempo de test"
                    startTime={test?.startTime}
                    endTime={test?.endTime}
                  />
                </div>
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
