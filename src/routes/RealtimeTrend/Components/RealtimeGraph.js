import React from 'react'
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const RealtimeGraph = (props) => {
  const transformProps = ()=>{
    const tenRandomColors = props.colors;
    let labels = [];
    let indiData = [];
    for(let i=0;i<10;i++){
      indiData.push([]);
    }
    props.values.map(e=>{
      labels.push(e.timestamp.replaceAll('-','/').slice(5).split(" ").reverse());
      for(let i=1;i<=10;i++){
        indiData[i-1].push(e.data[i+props.currentChannels*10-1]);
      }
    });

    let datasets = [];
    for(let i=1;i<=10;i++){
      datasets.push({
        label: `Channel ${i+props.currentChannels*10}`,
        data: indiData[i-1],
        borderColor: tenRandomColors[i-1],
        fill: false
      });
    }

    return {
      labels,
      datasets
    }
  }

  return (
    <div className='realtime-graph-container shadow'>
      { console.log(transformProps())}
      <Line className='realtime-graph' data={transformProps()} options={{
        animation: false,
        maintainAspectRatio: false,
        plugins:{
          legend:false
        },
        scales:{
          x:{
            ticks:{
              font:{
                size: 12
              }
            }
          },
          y:{
            ticks:{
              font:{
                size: 20
              }
            }
          }
        }
      }}
      width={800} height={600} />
    </div>
  )
}

export default RealtimeGraph