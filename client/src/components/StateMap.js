import React, { useEffect, useRef, useState } from 'react'

const DIM = 500
const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL

export default ({ step = 0, initialCases = 5, scaling = 10 }) => {
  const canvasRef = useRef()
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(apiUrl + `/initialstate/${initialCases}/${scaling}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])
  useEffect(() => {
    if (canvasRef.current && !!data) {
      const scalar = DIM / data[step].cells.length
      const ctx = canvasRef.current.getContext('2d')
      data[step].cells.forEach((row, i) =>
        row.forEach((d, j) => {
          ctx.fillStyle =
            {
              Infected: 'red',
              Susceptible: 'yellow',
              Recovered: 'blue',
              Dead: 'black',
            }[d] || 'white'
          ctx.fillRect(i * scalar, j * scalar, scalar, scalar)
        })
      )
    }
  }, [data])
  return <canvas ref={canvasRef} width={DIM} height={DIM} />
}
