import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import blog from "./routes/blog.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/api/blog", blog);

// start the Express server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
