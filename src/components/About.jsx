import React from "react";
import faceImage from "../assets/face.jpg";

const About = () => {
	return (
		<section id="about" className="section">
			<div className="container">
				<div className="about-content">
					<div className="about-text">
						<h1>Nicholas Buryniuk</h1>
						<h2>Software Developer</h2>
						<p>
							Welcome to my blog. I am a Software Developer with a passion in working with new technology.
						</p>
					</div>
					<div className="about-image">
						<img src={faceImage} alt="Profile" className="profile-image" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
