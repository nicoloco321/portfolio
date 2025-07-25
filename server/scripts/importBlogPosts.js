import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
	console.error("Supabase credentials are not set in environment variables");
	process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function importProjects() {
	try {
		// Read the projects.json file
		const projectsPath = path.join(__dirname, "../../src/data/projects.json");
		const projectsData = JSON.parse(fs.readFileSync(projectsPath, "utf8"));

		// Prepare the data for insertion (top-level fields only)
		const projects = projectsData.projects.map((project) => ({
			id: project.id,
			title: project.title,
			description: project.description,
			demoLink: project.demoLink,
			githubLink: project.githubLink,
			learnMore: project.learnMore,
		}));

		// Insert all projects into the 'projects' table
		const { data, error } = await supabase.from("projects").insert(projects);

		if (error) {
			console.error("Error inserting projects:", JSON.stringify(error, null, 2));
		} else {
			console.log("Successfully inserted projects:", data);
		}
	} catch (err) {
		console.error("Error importing projects:", err);
	}
}

importProjects();
