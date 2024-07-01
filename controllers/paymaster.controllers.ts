import { NextFunction, Request, Response } from "express";
import { paymasterClient } from "../services/paymaster.services";

export async function sponsor(request: Request, response: Response, next: NextFunction) {
    try {
        const method = request.body.method;
        const [userOp] = request.body.params;

        console.log("request.body: ", request.body);

        if (method === "pm_getPaymasterStubData") {
            console.log("pm_getPaymasterStubData");
            const result = await paymasterClient.getPaymasterStubData({
                userOperation: (userOp),
            });
            console.log("result: ", result);
            return response.json({ result });
        } else if (method === "pm_getPaymasterData") {
            console.log("pm_getPaymasterData");
            const result = await paymasterClient.getPaymasterData({
                userOperation: (userOp),
            });
            console.log("result: ", result);
            return response.json({ result });
        }
        return response.json({ error: "Method not found" });

    } catch (error) {
        console.error("[controllers/paymaster] Failed: ", error);
        next(error);
    }
}


