import functionPlot from 'function-plot';
import React, { useEffect } from 'react';

function Graph({ x, y, z }) {
  useEffect(() => {
    functionPlot({
      target: '#test',
      width: '580',
      height: '400',
      zAxis: {
        label: 'z axis',
        domain: [0, z],
      },
      yAxis: {
        label: 'y axis',
        domain: [0, y],
      },
      xAxis: {
        label: 'x axis',
        domain: [0, x],
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
        id="test"
        style={{
          width: '100%',
          height: '500px',
        }}
      ></div>
    </div>
  );
}

export default Graph;
