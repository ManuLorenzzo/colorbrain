import React, { useCallback, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import useWindowDimensions from '../../Hooks/useWindowDimensions'

const COLORS = ['#444857', '#5B5F6C', '#737681', '#A2A4AB', '#B9BAC0', '#D0D1D5', '#E8E8EA']
const renderCustomizedLabel = props => {
  const RADIAN = Math.PI / 180
  const payload = props.payload
  const { cx, cy, midAngle, outerRadius, fill, percent, value } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 5) * cos
  const sy = cy + (outerRadius + 5) * sin
  const mx = cx + (outerRadius + 12) * cos
  const my = cy + (outerRadius + 12) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 12
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    // <text
    //   x={x}
    //   y={y}
    //   fill="white"
    //   fontWeight={500}
    //   textAnchor={x > cx ? 'start' : 'end'}
    //   dominantBaseline="left"
    // >
    //   {`${(percent * 100).toFixed(0)}%`}
    // </text>
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        fontWeight={500}
        textAnchor={textAnchor}
        fill="#333"
      >
        {payload.name} {payload.name === 'Fallo' ? '' : 'intentos'}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fontWeight={500}
        fill="#999"
      >
        {`${percent * 100}%`}
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

  return (
    <ResponsiveContainer width="99%" height={width < 800 ? 230 : 350}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={width < 1100 ? width / 2.3 : width / 9.5}
          cy={width < 1100 ? 110 : 150}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={width < 1100 ? 60 : 80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
