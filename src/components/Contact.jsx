import React from "react";

const Contact = () => {
	return (
		<section id="contact" className="section">
			<div className="container">
				<h2>Contact Me</h2>
				<div className="contact-content">
					<p>I'm always interested in hearing about new projects and opportunities.</p>
					<div className="contact-links">
						<a href="mailto:your.email@example.com">Email</a>
						<a href="https://linkedin.com/in/yourprofile" target="_blank">
							LinkedIn
						</a>
						<a href="https://github.com/yourusername" target="_blank">
							GitHub
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
