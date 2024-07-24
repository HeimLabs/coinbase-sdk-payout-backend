import { NextFunction, Request, Response } from "express";
import { createCoinbaseRequest, fetchCoinbaseRequest } from "./helpers.controllers";

export async function createOnrampToken(request: Request, response: Response, next: NextFunction) {
    try {
        const { address } = request.body
        const request_method = "POST";
        console.log("1");
        const { url, jwt } = await createCoinbaseRequest({
            request_method,
            request_path: "/onramp/v1/token",
        });
        console.log("2");
        console.log("url:", url);
        console.log("jwt:", jwt);
        const body = {
            destination_wallets: [
                {
                    address,
                    blockchains: ["base"],
                },
            ],
        };

        console.log("3");
        await fetchCoinbaseRequest({
            request_method,
            url,
            jwt,
            body: JSON.stringify(body),
            res: response,
        });
        console.log("4");
    } catch (error) {
        console.error("[controllers/onramp] Failed: ", error);
        next(error);
    }
}


