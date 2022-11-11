import React from "react";
import "./Home.css";
import bhelsonic from "./bhelsonic-text.png";
import { Link } from "react-router-dom";

function Welcome(props) {
	const getpath=()=>{
		return props.name.split(" ").join("").toLowerCase();
	}
	return (
		<div className="home-card">
			<Link to={getpath()}><button className="home-nav-btn">{props.name}</button></Link>
		</div>
	);
}

const Home = () => {
	return (
		<div className="flex-parent-container">
			<div className="flex-container-1">
				<div className="card bar-graph">
					<Welcome name="Bar Graph" />
				</div>
				<div className="card freq-spec">
					<Welcome name="Frequency Spectrum" />
				</div>

				<div className="card trends">
					<Welcome name="Realtime Trend" />
				</div>
			</div>

			<div className="flex-container-2">
				<div className="card mimic">
					<Welcome name="Mimic Screen" />
				</div>

				<div className="card sonic">
					<img src={bhelsonic}></img>
				</div>

				<div className="card sens-prof">
					<Welcome name="Sensor Profiles" />
				</div>
			</div>

			<div className="flex-container-3">
				<div className="card settings">
					<Welcome name="Sensor Settings" />
				</div>
				<div className="card status">
					<Welcome name="Status Summary" />
				</div>
				<div className="card help">
					<Welcome name="Help" />
				</div>
			</div>
		</div>
	);
};
export default Home;
