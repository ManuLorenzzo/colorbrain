import React, { useCallback, useState } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts'
import useWindowDimensions from '../../Hooks/useWindowDimensions'

const renderActiveShape = (props, title) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 15) * cos
  const my = cy + (outerRadius + 15) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="#9c9c9c" fontWeight={500}>
        {title}
      </text>
      <text
        x={cx}
        y={title ? cy + 10 : cy}
        dy={8}
        textAnchor="middle"
        fill="#444857"
        fontWeight={500}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="#444857"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill="#444857"
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="#444857" fill="none" />
      <circle cx={ex} cy={ey} r={2} fill="#444857" stroke="none" />
      {/*<text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#444857"
        fontWeight={500}
  >{`${payload.name} intentos`}</text>*/}
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 7}
        y={ey}
        dy={5}
        textAnchor={textAnchor}
        fill="#444857"
        fontWeight={500}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  )
}

export default function RechartPie({ data, title }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )
  const { width } = useWindowDimensions()
  console.log({ data })
  return (
    <ResponsiveContainer width="99%" height={width < 800 ? 230 : 350}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={props => renderActiveShape(props, title)}
          data={data}
          cx={width / 2.3}
          cy={width < 800 ? 110 : 150}
          innerRadius={width < 800 ? 50 : 90}
          outerRadius={width < 800 ? 65 : 105}
          fill="#9c9c9c"
          dataKey="value"
          onMouseEnter={onPieEnter}
          animationBegin={0}
          animationDuration={1000}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
