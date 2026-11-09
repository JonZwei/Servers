import express, { NextFunction, type Express, type Request, type Response } from "express";


export async function handlerReadiness(req: Request, res: Response, next: NextFunction) {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("OK");
}

export async function handlerValidateChirp(req: Request, res: Response, next: NextFunction) {
    type parameters = {
        body: string;
    };

    const params: parameters = req.body;
    
    if (typeof params?.body !== "string") {
        respondWithJSON(res, 400, { "error": "Chirp is not a string" });
    }
    else if (params.body.length > 140) {
        throw new Error("Chirp is too long");
    }
    else {
        respondWithJSON(res, 200, { "cleanedBody": cleanChirp(params.body) });
    }
}    

function respondWithJSON(res: Response, code: number, payload: object) {
    res.header("Content-Type", "application/json");
    res.status(code).send(JSON.stringify(payload));
}

const profaneWords = new Set(["kerfuffle", "sharbert", "fornax"]);

function cleanChirp(text: string): string {
    return text
        .split(" ")
        .map((word) => (profaneWords.has(word.toLowerCase()) ? "****" : word))
        .join(" ");
}


