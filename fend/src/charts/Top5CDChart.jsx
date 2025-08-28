import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

const Top5CDChart = ({ data }) => {

  const formattedData = data.map(item => ({
    ...item,
    label: `${item.label} (₹${item.value.toLocaleString()})`
  }));
  return (
    <>
      <PieChart
        series={[
          {
            data: formattedData,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: {
              innerRadius: 30,
              additionalRadius: -8,
            },
            //   valueFormatter: () => ``
          },
        ]}
        width={300}
        height={250}
      />
    </>
  )
}

export default Top5CDChart