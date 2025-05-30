import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all blog posts
router.get("/", async (req, res) => {
	try {
		let collection = await db.collection("blog_posts");
		let results = await collection.find({}).toArray();
		res.send(results).status(200);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error fetching blog posts");
	}
});

// Get a single blog post by id
router.get("/:id", async (req, res) => {
	try {
		let collection = await db.collection("blog_posts");
		let query = { id: req.params.id };
		let result = await collection.findOne(query);

		if (!result) res.send("Not found").status(404);
		else res.send(result).status(200);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error fetching blog post");
	}
});

export default router;
