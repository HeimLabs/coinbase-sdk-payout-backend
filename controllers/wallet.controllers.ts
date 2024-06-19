import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

export async function createWallet(req: Request, res: Response, next: NextFunction) {
    try {
        return res.status(200).json();

        throw new AppError(500, "error", "Error ");
    } catch (error) {
        next(error);
    }
}

export async function sendAssets(req: Request, res: Response, next: NextFunction) {
    try {
        return res.status(200).json();

        throw new AppError(500, "error", "Error ");
    } catch (error) {
        next(error);
    }
}


