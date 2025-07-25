import fs from "fs";
import path from "path";

const jsonPath = path.join(process.cwd(), "src/data/projects.json");
const csvPath = path.join(process.cwd(), "projects.csv");

const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const projects = jsonData.projects;

const headers = ["id", "title", "description", "demoLink", "githubLink", "learnMore"];

const escapeCsv = (value) => {
	if (typeof value !== "string") value = value === undefined || value === null ? "" : String(value);
	if (value.includes('"')) value = value.replace(/"/g, '""');
	if (value.includes(",") || value.includes('"') || value.includes("\n")) value = `"${value}"`;
	return value;
};

const csvRows = [headers.join(",")];
for (const project of projects) {
	const row = headers.map((key) => escapeCsv(project[key]));
	csvRows.push(row.join(","));
}

fs.writeFileSync(csvPath, csvRows.join("\n"), "utf8");
console.log(`CSV file created at ${csvPath}`);
