import React, { useEffect, useState } from "react";

const Header = () => {
	const [isHidden, setIsHidden] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				// Scrolling down
				setIsHidden(true);
			} else {
				// Scrolling up
				setIsHidden(false);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [lastScrollY]);

	const handleClick = (e, targetId) => {
		e.preventDefault();
		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<header className={`header ${isHidden ? "hidden" : ""}`}>
			<nav className="nav">
				<ul>
					<li>
						<a href="#about" onClick={(e) => handleClick(e, "about")}>
							About
						</a>
					</li>
					<li>
						<a href="#skills" onClick={(e) => handleClick(e, "skills")}>
							Skills
						</a>
					</li>
					<li>
						<a href="#projects" onClick={(e) => handleClick(e, "projects")}>
							Projects
						</a>
					</li>
					<li>
						<a href="#contact" onClick={(e) => handleClick(e, "contact")}>
							Contact
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
