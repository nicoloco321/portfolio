import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri);

async function importBlogPosts() {
	try {
		await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db("portfolio");
		const collection = db.collection("blog_posts");

		// Read the projects.json file
		const projectsPath = path.join(__dirname, "../../src/data/projects.json");
		const projectsData = JSON.parse(fs.readFileSync(projectsPath, "utf8"));

		// Insert each project into the database
		for (const project of projectsData.projects) {
			await collection.insertOne(project);
			console.log(`Imported project: ${project.title}`);
		}

		console.log("Import completed successfully");
	} catch (err) {
		console.error("Error importing blog posts:", err);
	} finally {
		await client.close();
	}
}

importBlogPosts();
