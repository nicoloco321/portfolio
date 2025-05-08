import React from "react";
import { Link } from "react-router-dom";
import projectData from "../data/projects.json";

const Projects = () => {
	return (
		<section id="projects" className="section">
			<div className="container">
				<h2>Projects</h2>
				<div className="projects-grid">
					{projectData.projects.map((project) => (
						<div key={project.id} className="project-card">
							<Link to={`/blog/${project.id}`} className="project-content">
								<h3>{project.title}</h3>
								<p>{project.description}</p>
							</Link>
							<div className="project-links">
								{project.demoLink !== "#" && (
									<a
										href={project.demoLink}
										target="_blank"
										rel="noopener noreferrer"
										className="demo-link"
									>
										View Live Demo
									</a>
								)}
								{project.githubLink !== "#" && (
								<a
									href={project.githubLink}
									target="_blank"
									rel="noopener noreferrer"
									className="github-link"
								>
									View on GitHub
								</a>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Projects;
