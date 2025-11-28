import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const client = require('prom-client');
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// Create a Registry to register metrics
const register = new client.Registry();

// 1. Collect Default Metrics (CPU, Memory, GC, Event Loop)
client.collectDefaultMetrics({ register });

// 2. Expose the /metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});