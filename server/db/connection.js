import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";
console.log("Attempting to connect to MongoDB...");

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

try {
	// Connect the client to the server
	console.log("Initiating MongoDB connection...");
	await client.connect();
	// Send a ping to confirm a successful connection
	console.log("Connection established, sending ping...");
	await client.db("admin").command({ ping: 1 });
	console.log("Successfully connected to MongoDB!");
} catch (err) {
	console.error("MongoDB connection error:", err);
	process.exit(1); // Exit if we can't connect to the database
}

let db = client.db("portfolio");

// Test the database connection
try {
	await db.command({ ping: 1 });
	console.log("Successfully connected to 'portfolio' database");
} catch (err) {
	console.error("Error connecting to 'portfolio' database:", err);
	process.exit(1);
}

export default db;
