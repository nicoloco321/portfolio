import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import projectData from "../data/projects.json";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";

// Import all images from assets folder
const importImage = (imageName) => {
	try {
		return new URL(`../assets/${imageName}`, import.meta.url).href;
	} catch (error) {
		console.error(`Error loading image: ${imageName}`, error);
		return null;
	}
};

const BlogPost = () => {
	const { projectId } = useParams();
	const project = projectData.projects.find((p) => p.id === projectId);

	useEffect(() => {
		window.scrollTo(0, 0);
		Prism.highlightAll();
	}, [project]);

	if (!project || !project.blogContent) {
		return <div>Blog post not found</div>;
	}

	const { title, date, content } = project.blogContent;

	const renderContent = (item, index) => {
		switch (item.type) {
			case "paragraph":
				return <p key={`p-${index}`} dangerouslySetInnerHTML={{ __html: item.text }} />;
			case "heading":
				return <h2 key={`h-${index}`}>{item.text}</h2>;
			case "list":
				return (
					<ul key={`ul-${index}`}>
						{item.items.map((listItem, idx) => (
							<li key={`li-${index}-${idx}`}>{listItem}</li>
						))}
					</ul>
				);
			case "code":
				return (
					<pre key={`code-${index}`} className="code-block">
						<code className={`language-${item.language || "cpp"}`}>{item.text}</code>
					</pre>
				);
			case "image":
				const imageSrc = importImage(item.items);
				return (
					<div key={`img-${index}`} className="blog-image">
						<img src={imageSrc} alt={item.alt || ""} />
						{item.caption && <p className="image-caption">{item.caption}</p>}
					</div>
				);
			case "iframe":
				return (
					<iframe
						key={`iframe-${index}`}
						src={item.src}
						alt={item.alt || ""}
						title={item.title || "Iframe"}
						style={{ border: "none" }}
					></iframe>
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
				<div className="blog-content">
					{content.map((item, index) => renderContent(item, index))}
				</div>
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
