import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import BlogPost from "./components/BlogPost";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() {
	return (
		<Router basename="/portfolio">
			<div className="portfolio">
				<Header />
				<main>
					<Routes>
						<Route
							path="/"
							element={
								<>
									<Projects />
									<Skills />
									<About />
									<Contact />
								</>
							}
						/>
						<Route path="/blog/:projectId" element={<BlogPost />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
