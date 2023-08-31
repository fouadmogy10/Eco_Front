import React from 'react'
import ContentLoader from 'react-content-loader'

const StoreSkelton = props => {
  // Get values from props
  // const { rows, columns, coverHeight, coverWidth, padding, speed } = props;

  // Hardcoded values
  const rows = 5
  const columns = 6
  const coverHeight = 200
  const coverWidth = 200
  const padding = 5
  const speed = 3

  const coverHeightWithPadding = coverHeight + padding
  const coverWidthWithPadding = coverWidth + padding
  const initial = 35
  const covers = Array(columns * rows).fill(1)

  return (
    <ContentLoader
      speed={speed}
      width={"100%"}
      height={"90vh"}
      foregroundColor="#5e5e5e"
      {...props}
    >
      {/* <rect
        x="0"
        y="0"
        rx="0"
        ry="0"
        width={columns * coverWidthWithPadding - padding}
        height="20"
      /> */}

      {covers.map((g, i) => {
        let vy = Math.floor(i / columns) * coverHeightWithPadding + initial
        let vx = (i * coverWidthWithPadding) % (columns * coverWidthWithPadding)
        return (
          <rect
            key={i}
            x={vx}
            y={vy}
            rx="0"
            ry="0"
            width={coverWidth}
            height={coverHeight}
          />
        )
      })}
    </ContentLoader>
  )
}

StoreSkelton.metadata = {
  name: 'Pratik Pathak',
  github: 'PathakPratik',
  description: 'Netflix Style Dynamic',
  filename: 'Netflix',
}

export default StoreSkelton