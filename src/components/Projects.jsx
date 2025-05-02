import React from "react";
import projectData from "../data/projects.json";

const Projects = () => {
	return (
		<section id="projects" className="section">
			<div className="container">
				<h2>Projects</h2>
				<div className="projects-grid">
					{projectData.projects.map((project) => (
						<a
							key={project.id}
							href={project.demoLink}
							rel="noopener noreferrer"
							className="project-card"
						>
							<h3>{project.title}</h3>
							<p>{project.description}</p>
							<div className="project-links">
								<a
									href={project.demoLink}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e) => e.stopPropagation()}
								>
									Live Demo
								</a>
								<a
									href={project.githubLink}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e) => e.stopPropagation()}
								>
									GitHub
								</a>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
};

export default Projects;
