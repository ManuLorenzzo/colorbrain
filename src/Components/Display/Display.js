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

  return (
    <section className="display">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={swiper => console.log(swiper)}
        className="display__swiper"
      >
        {state?.tests
          ?.filter((test, i) => test.id === 0 || test.passed || state.tests[i - 1]?.passed)
          .map((test, i) => {
            return (
              <SwiperSlide style={{ cursor: 'grab' }} key={i}>
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
