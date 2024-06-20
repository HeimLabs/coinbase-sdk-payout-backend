import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { wallet } from "../services/coinbase.services";

export async function getWallet(req: Request, res: Response, next: NextFunction) {
    try {
        const addressData = wallet.getDefaultAddress();

        return res.status(200).json({
            address: addressData?.getId(),
            chain: addressData?.getNetworkId()
        });
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


