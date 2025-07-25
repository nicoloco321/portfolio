import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
	console.error("Supabase credentials are not set in environment variables");
	process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function fetchProjects() {
	const { data, error } = await supabase.from("projects").select("*");
	if (error) {
		console.error("Error fetching projects:", JSON.stringify(error, null, 2));
		process.exit(1);
	}
	console.log("Projects from Supabase:\n", JSON.stringify(data, null, 2));
}

fetchProjects();
