import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBlogPost = async () => {
			try {
				const response = await fetch(`http://localhost:5050/api/blog/${projectId}`);
				if (!response.ok) {
					throw new Error("Blog post not found");
				}
				const data = await response.json();
				setProject(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchBlogPost();
	}, [projectId]);

	useEffect(() => {
		if (project) {
			window.scrollTo(0, 0);
			Prism.highlightAll();
		}
	}, [project]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

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
				<a href="/portfolio/" className="button" style={{ marginBottom: "20px" }}>
					← home
				</a>
				<h1>{title}</h1>
				<div className="blog-meta">
					<span className="date">{new Date(date).toLocaleDateString()}</span>
				</div>
				<div className="blog-content">
					{content.map((item, index) => renderContent(item, index))}
				</div>
				<div className="blog-links">
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
		</div>
	);
};

export default BlogPost;
