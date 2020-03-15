import React, { useEffect, useRef, useState } from 'react'
import 'styled-components/macro'
import { css } from 'styled-components'
import data_ from 'components/data.json'

import MA from 'components/MA'

const DIM = 960
const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL

const unsafeShuffle = xs => {
  let ys = [...xs]
  const ln = ys.length
  for (const ix in ys) {
    const r = Math.floor(Math.random() * ln + ix)
    ;[ys[r], ys[ix]] = [ys[ix], ys[r]]
  }
  return ys
}

const fakeData = data_.map(d => {
  console.log(d)
  return { ...d, cells: d.cells.map(unsafeShuffle) }
})

export default ({ step = 0, initialCases = 5, scaling = 10 }) => {
  const canvasRef = useRef()
  console.log(fakeData)
  const [data, setData] = useState(fakeData)

  useEffect(() => {
    // fetch(apiUrl + `/initialstate/${initialCases}/${scaling}`)
    //   .then(res => res.json())
    //   // .then(setData)
    //   .catch(console.error)
  }, [])
  useEffect(() => {
    if (canvasRef.current && !!data) {
      const scalar = DIM / data[step].cells.length
      const ctx = canvasRef.current.getContext('2d')
      data[step].cells.forEach((row, i) =>
        row.forEach((d, j) => {
          ctx.fillStyle =
            {
              Susceptible: '#FFD568',
              Infected: '#A9163E',
              Recovered: '#ABAAEC',
              Dead: 'black',
            }[d] || '#F6F4EF'
          ctx.fillRect(i * scalar, j * scalar, scalar, scalar)
        })
      )
    }
  }, [data])
  return (
    <div
      width={DIM}
      height={DIM}
      css={css`
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        > * {
          grid-column: 1 / -1;
          grid-row: 1 / -1;
        }
      `}
    >
      <svg
        width={DIM}
        height={DIM}
        viewBox="0 0 960 960"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="state">
            <MA />
          </clipPath>
        </defs>
      </svg>
      <canvas
        ref={canvasRef}
        width={DIM}
        height={DIM}
        css={css`
          clip-path: url(#state);
        `}
      />
    </div>
  )
}
