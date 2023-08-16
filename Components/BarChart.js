import React, { PureComponent } from 'react'
import { Svg, G, Line, Rect, Text } from 'react-native-svg'
import * as d3 from 'd3'

const GRAPH_MARGIN = 40
const GRAPH_BAR_WIDTH = 10
const colors = {
  axis: 'black',
  bars: {
    1: '#15AD13',
    2: '#223D63',
    3: '#CC6600',
    4: '#9933FF',
    5: '#0066CC',
    6: '#FF3333',
    7: '#006633',
  }
}
total_bar_colors = Object.keys(colors.bars).length

export default class BarChart extends PureComponent {
  render() {
    // Dimensions
    const SVGHeight = 300
    const SVGWidth = 500
    const graphHeight = SVGHeight - 2 * GRAPH_MARGIN
    const graphWidth = SVGWidth - 2 * GRAPH_MARGIN
    const mydata = this.props.data

    const allAccuracyAttempts = mydata[this.props.gameName][this.props.macroName]['accuracy']
    
    var data = []
    var revisedData = []
    var timestamps = []
    for (let level=1 ; level<Object.keys(allAccuracyAttempts).length+1 ; level++) {
      levelAttempts = allAccuracyAttempts[level]
      for (const [key, value] of Object.entries(levelAttempts)) {
        console.log(levelAttempts[key]['time'], levelAttempts[key]['correct'])
        timestamps.push(key)
        data.push( {label: levelAttempts[key]['time'], value: levelAttempts[key]['correct'], level: level, timestamp: key} )
      }
    }
    // for (let timestamp=1 ; timestamp<timestamps.length+1 ; timestamp++) {
    //   next = Math.min(timestamps)
    //   // console.log(data[next])
    //   revisedData.push({label: data[next][label], value: data[next][value], level: data[next][level], timestamp: next})
    //   timestamps = timestamps.filter(e => e !== next)
    // }
    // data = revisedData
 
      
    // X scale point
    const xDomain = data.map(item => item.label)
    const xRange = [0, graphWidth]
    const x = d3.scalePoint()
      .domain(xDomain)
      .range(xRange)
      .padding(1)

    // Y scale linear
    const maxValue = 2//d3.max(data, d => d.value)
    const topValue = Math.ceil(maxValue / this.props.round) * this.props.round
    const yDomain = [0, topValue]
    const yRange = [0, graphHeight]
    const y = d3.scaleLinear()
      .domain(yDomain)
      .range(yRange)

    // top axis and middle axis
    const middleValue = topValue / 2

    return (
      <Svg width={SVGWidth} height={SVGHeight}>
        <G y={graphHeight + GRAPH_MARGIN}>
          {/* Top value label */}
          <Text
              x={graphWidth}
              textAnchor="end"
              y={y(topValue) * -1 - 5}
              fontSize={12}
              fill="black"
              fillOpacity={0.4}>
              {topValue + ' ' + this.props.unit}
            </Text>

          {/* top axis */}
          <Line
            x1="0"
            y1={y(topValue) * -1}
            x2={graphWidth}
            y2={y(topValue) * -1}
            stroke={colors.axis}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
          />

          {/* middle axis */}
          <Line
            x1="0"
            y1={y(middleValue) * -1}
            x2={graphWidth}
            y2={y(middleValue) * -1}
            stroke={colors.axis}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
          />

          {/* bottom axis */}
          <Line
            x1="0"
            y1="2"
            x2={graphWidth}
            y2="2"
            stroke={colors.axis}
            strokeWidth="0.5"
          />
          {/* labels */}
          {data.map(item => (
            <Text
            key={'label' + item.label}
            fontSize="10"
            fill="black"
            x={x(item.label)}
            y={-120*item.value}
            textAnchor="middle"
            >{(100*item.value).toFixed(0)+'%'}</Text>
            // 
          ))}

           {/* bars */}
           {data.map(item => (
            <Rect
              key={'bar' + item.label}
              x={x(item.label) - (GRAPH_BAR_WIDTH / 2)}
              y={y(item.value) * -1}
              rx={2.5}
              width={GRAPH_BAR_WIDTH}
              height={y(item.value)}
              fill={colors.bars[item.level%total_bar_colors]}
            />

            
          ))}

            <Rect
                key={'bar' + colors.bars[1]}
                x={400}
                y={-50}
                rx={2.5}
                width={GRAPH_BAR_WIDTH*5}
                height={5}
                fill={colors.bars[1]}
              >
            <Text>1</Text>                
              </Rect>


            <Rect
                key={'bar' + colors.bars[2]}
                x={400}
                y={-30}
                rx={2.5}
                width={GRAPH_BAR_WIDTH*5}
                height={5}
                fill={colors.bars[2]}
              />
            {/* <Text
            key={'label' + item.label}
            fontSize="10"
            fill="black"
            x={x(item.label)}
            y={10}
            textAnchor="middle"
            >2</Text> */}

          {/* x labels */}
          {data.map(item => (
            <Text
            key={'label' + item.label}
            fontSize="10"
            fill="black"
            x={x(item.label)}
            y={20}
            textAnchor="middle"
            >{item.label}</Text>
            // 
          ))}
        </G>
      </Svg>
    )
  }
}