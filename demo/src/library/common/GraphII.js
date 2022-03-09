import functionPlot from 'function-plot';
import React, { useEffect } from 'react';

function Graph() {
  useEffect(() => {
    functionPlot({
      target: '#testII',
      width: '580',
      height: '400',
      yAxis: {
        label: 'y axis',
        domain: [0, 40],
      },
      xAxis: {
        label: 'x axis',
        domain: [0, 30],
      },
      data: [
        {
          fn: '0.01x^2 + 15',
        },
      ],
      disableZoom: true,
      grid: true,
    });
  });
  return (
    <div className="Graph">
      <div
        id="testII"
        style={{
          width: '100%',
          height: '500px',
        }}
      ></div>
    </div>
  );
}

export default Graph;
