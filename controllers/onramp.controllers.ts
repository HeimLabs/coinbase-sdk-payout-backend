import { NextFunction, Request, Response } from "express";
import { createCoinbaseRequest, fetchCoinbaseRequest } from "./helpers.controllers";

export async function createOnrampToken(request: Request, response: Response, next: NextFunction) {
    try {
        const { address } = request.body
        const request_method = "POST";

        const { url, jwt } = await createCoinbaseRequest({
            request_method,
            request_path: "/onramp/v1/token",
        });

        const body = {
            destination_wallets: [
                {
                    address,
                    blockchains: ["base"],
                },
            ],
        };

        await fetchCoinbaseRequest({
            request_method,
            url,
            jwt,
            body: JSON.stringify(body),
            res: response,
        });
    } catch (error) {
        console.error("[controllers/onramp] Failed: ", error);
        next(error);
    }
}


