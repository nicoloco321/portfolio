import React from "react";

const Projects = () => {
	return (
		<section id="projects" className="section">
			<div className="container">
				<h2>Projects</h2>
				<div className="projects-grid">
					<div className="project-card">
						<h3>Project 1</h3>
						<p>Description of your first project goes here.</p>
						<div className="project-links">
							<a href="#" target="_blank">
								Live Demo
							</a>
							<a href="#" target="_blank">
								GitHub
							</a>
						</div>
					</div>
					<div className="project-card">
						<h3>Project 2</h3>
						<p>Description of your second project goes here.</p>
						<div className="project-links">
							<a href="#" target="_blank">
								Live Demo
							</a>
							<a href="#" target="_blank">
								GitHub
							</a>
						</div>
					</div>
					<div className="project-card">
						<h3>Project 3</h3>
						<p>Description of your third project goes here.</p>
						<div className="project-links">
							<a href="#" target="_blank">
								Live Demo
							</a>
							<a href="#" target="_blank">
								GitHub
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Projects;
