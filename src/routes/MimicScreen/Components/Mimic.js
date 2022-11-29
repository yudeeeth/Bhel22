import React from 'react'
import './Mimic.css'
import coords from './coords.json'
import bgImg from './mimic.png'
import SensorDot from './SensorDot'
import loc from './location.json'

const Mimic = (props) => {
	const [sensorCoord, setSensorCoord] = React.useState(coords);
	const [selectedSens, setSelectedSens] = React.useState(0);
	const [sensorIndex] = React.useState(0);
	const [currentSensor, setCurrentSensor] = React.useState(0);
	const sequence = [1, 2, 12, 10, 8, 6, 3, 11, 9, 7, 5, 4, 19, 21, 22, 17, 16, 20, 18, 23, 15, 13, 14, 24];
	const changeCoord = (xory, val) => {
		let copy = [...sensorCoord];
		if (xory === 'x') copy[sensorIndex][0] = val;
		else copy[sensorIndex][1] = val;
		setSensorCoord(copy);
		console.log(sensorCoord)
	}

	return (
		<div style={{minWidth:`${props.scale*1350}`,display:'flex',alignItems:'center'}}>
			<div className='mimic-hint-container' style={selectedSens==0?{visibility:'hidden'}:{}}>
				{loc[selectedSens]}:{props.dbArray[selectedSens]}:{}
			</div>
			<div className='mimic-display shadow' style={{ height: `${700 * props.scale}px`, width: `${1000 * props.scale}px`,minHeight: `${700 * props.scale}px`, minWidth: `${1250 * props.scale}px` }}>
				<div className='mimic-image-container' style={{ translate: `-${100 + (props.scale - 0.8) * 125}px -${700 * (1 - props.scale) / 2}px`, scale: `${props.scale}` }}>
					{/* <> */}
					<img className='mimic-display-bg' alt='sensor' src={bgImg}></img>
					{
						sequence.map(item => {
							return <SensorDot
								key={item}
								index={item - 1}
								leak={props.leak.includes(item)}
								coord={sensorCoord[item - 1]}
								location={loc[item]}
								db={props.dbArray[item - 1]}
								changeCoord={changeCoord}
								setSelectedSens={setSelectedSens}
							/>
						})
						// sensorCoord.map((val,index)=>{ return <SensorDot key={index} {...{coord:sensorCoord[sequence[index]-1],index: sequence[index]-1,changeCoord,db:props.dbArray[index],location:loc[parseInt(sequence[index])]}} />})
					}
					{
						/* 
					/ code to find out the coordinates of the sensors in the image
					<input type='range' step='1' min='0' max='1000' onChange={(e)=>{changeCoord('x',e.target.value)}} ></input> x-coord: {sensorCoord.length!=0 && sensorCoord[sensorIndex][0]} <br/>
					<input type='range' step='1' min='0' max='700' onChange={(e)=>{changeCoord('y',e.target.value)}}></input> y-coord: {sensorCoord.length!=0 && sensorCoord[sensorIndex][1]} <br />
					<input type='range' step='1' min='0' max='23' onChange={(e)=>{setSensorIndex(e.target.value); console.log(e.target.value)}}></input> Sensor Index: {parseInt(sensorIndex)+1}
					<button onClick={()=>{console.log(sensorCoord)}}></button> 
					</> */
					}
				</div>
			</div>
		</div>
	)
}

export default Mimic