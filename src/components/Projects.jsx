import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch("http://localhost:5050/api/blog");
				if (!response.ok) {
					throw new Error("Failed to fetch projects");
				}
				const data = await response.json();
				setProjects(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<section id="projects" className="section">
			<div className="container">
				<h2>Projects</h2>
				<div className="projects-grid">
					{projects.map((project) => (
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
										View Demo
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
