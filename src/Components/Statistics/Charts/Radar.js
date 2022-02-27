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
        cx={width / 2.3}
        cy={width / 3.5}
        outerRadius={width / 5}
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
