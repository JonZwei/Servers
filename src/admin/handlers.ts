import express, { NextFunction, type Express, type Request, type Response } from "express";
import { config } from "../config.js";


export async function handlerMetrics(req: Request, res: Response, next: NextFunction) {
    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(`<html>
    <body>
      <h1>Welcome, Chirpy Admin</h1>
      <p>Chirpy has been visited ${config.fileserverHits} times!</p>
    </body>
  </html>`);
}

export async function handlerReset(req: Request, res: Response, next: NextFunction) {
    config.fileserverHits = 0;
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("Hits reset to 0");
}