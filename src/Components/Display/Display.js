import React from 'react'
import { useSelector } from 'react-redux'
import Attempts from '../Attempts/Attempts'
import History from '../History/History'
import InputRow from '../InputRow/InputRow'
import Score from '../Score/Score'
import './Display.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function Display() {
  const state = useSelector(store => store.state)
  const test = state?.tests[state.selectedTest]

  return (
    <section className="display">
      {/*
      <Attempts test={test} selectedTest={state?.selectedTest + 1} />
      <History test={test} />
      {!test?.passed && test?.attempts > 0 && <InputRow state={state} test={test} />}
      <Score state={state} test={test} />
      */}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={swiper => console.log(swiper)}
        noSwiping={true}
        className="display__swiper"
      >
        {state?.tests?.map((test, i) => {
          const noSwipping = !Boolean(i !== 0 && state.tests[i - 1] && state.tests[i - 1]?.passed)
          return (
            <SwiperSlide
              className={noSwipping ? 'swiper-no-swiping' : ''}
              style={{ cursor: 'grab' }}
              key={i}
            >
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
