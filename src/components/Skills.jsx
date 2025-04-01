import React from "react";

const Skills = () => {
	return (
		<section id="skills" className="section">
			<div className="container">
				<h2>Skills</h2>
				<div className="skills-grid">
					<div className="skill-category">
						<h3>Frontend</h3>
						<ul>
							<li>React</li>
							<li>JavaScript</li>
							<li>HTML/CSS</li>
						</ul>
					</div>
					<div className="skill-category">
						<h3>Backend</h3>
						<ul>
							<li>Node.js</li>
							<li>Python</li>
							<li>Databases</li>
						</ul>
					</div>
					<div className="skill-category">
						<h3>Tools</h3>
						<ul>
							<li>Git</li>
							<li>Docker</li>
							<li>AWS</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Skills;
