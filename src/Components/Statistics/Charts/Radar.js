import React from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import useWindowDimensions from '../../Hooks/useWindowDimensions'

export default function RadarsChart({ data }) {
  const { width } = useWindowDimensions()
  return (
    <ResponsiveContainer width={'99%'} height={width / 1.5}>
      <RadarChart
        cx={width < 1100 ? width / 2.3 : width / 9}
        cy={width < 1100 ? width / 3.5 : width / 10}
        outerRadius={width < 1100 ? width / 5.5 : width / 15}
        width={width / 2}
        height={width / 3}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar name="Mike" dataKey="veces" stroke="#444857" fill="#444857" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
