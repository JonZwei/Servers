import express, { type Express, type Request, type Response } from "express";
import { handlerReadiness, handlerValidateChirp } from "./api/handlers.js";
import { handlerMetrics, handlerReset } from "./admin/handlers.js";
import { middlewareLogResponses, middlewareMetricsInc, middlewareErrorHandler } from "./api/middleware.js"

const app: Express = express();
const port = 8080;
app.use(express.json());

app.get("/api/healthz", handlerReadiness);
app.get("/admin/metrics", handlerMetrics);
app.post("/admin/reset", handlerReset);
app.post("/api/validate_chirp", handlerValidateChirp);

app.use(middlewareLogResponses);

app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.use(middlewareErrorHandler);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
