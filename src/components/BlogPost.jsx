import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import projectData from "../data/projects.json";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";

const BlogPost = () => {
	const { projectId } = useParams();
	const project = projectData.projects.find((p) => p.id === projectId);

	useEffect(() => {
		Prism.highlightAll();
	}, [project]);

	if (!project || !project.blogContent) {
		return <div>Blog post not found</div>;
	}

	const { title, date, content } = project.blogContent;

	const renderContent = (item) => {
		switch (item.type) {
			case "paragraph":
				return <p key={item.text} dangerouslySetInnerHTML={{ __html: item.text }} />;
			case "heading":
				return <h2 key={item.text}>{item.text}</h2>;
			case "list":
				return (
					<ul key={item.items.join()}>
						{item.items.map((listItem, index) => (
							<li key={index}>{listItem}</li>
						))}
					</ul>
				);
			case "code":
				return (
					<pre key={item.text} className="code-block">
						<code className={`language-${item.language || "cpp"}`}>{item.text}</code>
					</pre>
				);
			default:
				return null;
		}
	};

	return (
		<div className="blog-post">
			<div className="container">
				<h1>{title}</h1>
				<div className="blog-meta">
					<span className="date">{new Date(date).toLocaleDateString()}</span>
				</div>
				<div className="blog-content">{content.map((item, index) => renderContent(item))}</div>
				<div className="blog-links">
					<a
						href={project.demoLink}
						target="_blank"
						rel="noopener noreferrer"
						className="demo-link"
					>
						View Live Demo
					</a>
					<a
						href={project.githubLink}
						target="_blank"
						rel="noopener noreferrer"
						className="github-link"
					>
						View on GitHub
					</a>
				</div>
			</div>
		</div>
	);
};

export default BlogPost;
