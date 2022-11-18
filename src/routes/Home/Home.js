import React from "react";
import "./Home.css";
import bhelsonic from "./bhelsonic-text.png";
import { Link } from "react-router-dom";
// import the pngs from ../../icons folder
import BGicon from "../../icons/bar-graph.png";
import FSicon from "../../icons/pulseSpectrum.png";
import RTicon from "../../icons/realtime.png";
// import SSicon from "../../icons/status-summary.png";
import SPicon from "../../icons/Sensor profile.png";
import Eye from "../../icons/eye.png";
import HI from "../../icons/help.png";
import M from "../../icons/mimic.png"
import SetI from "../../icons/settings.png";



function Card(props) {
	const getpath=()=>{
		return props.name.split(" ").join("").toLowerCase();
	}
	return (
		<div className="home-card">
			{ props.icon && <img src={props.icon} style={{height:'4rem',width:'4rem'}}/>}
			<Link to={getpath()}><button className="home-nav-btn">{props.name}</button></Link>
		</div>
	);
}

const Home = () => {
	return (
		<div className="flex-parent-container">
			<div className="flex-container-1">
				<div className="card bar-graph">
					<Card name="Bar Graph" icon={BGicon}/>
				</div>
				<div className="card freq-spec">
					<Card name="Frequency Spectrum" icon={FSicon}/>
				</div>

				<div className="card trends">
					<Card name="Realtime Trend" icon={RTicon}/>
				</div>
			</div>

			<div className="flex-container-2">
				<div className="card mimic">
					<Card name="Mimic Screen" icon={M}/>
				</div>

				<div className="card sonic">
					<img src={bhelsonic}></img>
				</div>

				<div className="card sens-prof">
					<Card name="Sensor Profile" icon={SPicon}/>
				</div>
			</div>

			<div className="flex-container-3">
				<div className="card settings">
					<Card name="Sensor Settings" icon={SetI}/>
				</div>
				<div className="card status">
					<Card name="Status Summary" icon={Eye}/>
				</div>
				<div className="card help">
					<Card name="Help" icon={HI}/>
				</div>
			</div>
		</div>
	);
};
export default Home;
