import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uri = process.env.ATLAS_URI;
if (!uri) {
	console.error("ATLAS_URI is not defined in environment variables");
	process.exit(1);
}

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

		// Upsert each project into the database
		for (const project of projectsData.projects) {
			const result = await collection.updateOne(
				{ id: project.id },
				{ $set: project },
				{ upsert: true }
			);
			if (result.upsertedCount > 0) {
				console.log(`Inserted project: ${project.title}`);
			} else if (result.modifiedCount > 0) {
				console.log(`Updated project: ${project.title}`);
			} else {
				console.log(`No changes for project: ${project.title}`);
			}
		}

		console.log("Import completed successfully");
	} catch (err) {
		console.error("Error importing blog posts:", err);
	} finally {
		await client.close();
	}
}

importBlogPosts();
