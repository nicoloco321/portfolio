import React from "react";

const Contact = () => {
	return (
		<section id="contact" className="section">
			<div className="container">
				<h2 className="contact-heading">Contact Me</h2>
				<div className="contact-content">
					<p>Feel free to reach out to me through any of these platforms:</p>
					<div className="contact-links">
						<a href="mailto:nicoloco321@gmail.com">Email</a>
						<a
							href="https://www.linkedin.com/in/nicholas-buryniuk-82a057142/"
							target="_blank"
							rel="noopener noreferrer"
						>
							LinkedIn
						</a>
						<a href="https://github.com/nicoloco321" target="_blank" rel="noopener noreferrer">
							GitHub
						</a>
						<a href="src/assets/Resume.pdf" download="Nicholas_Buryniuk_Resume.pdf">
							Resume
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
