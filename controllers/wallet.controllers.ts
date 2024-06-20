import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { wallet } from "../services/coinbase.services";
import { AssetTransferRequest } from "types/api.types";
import { ethers } from "ethers";
import { Coinbase } from "@coinbase/coinbase-sdk";
// import { ERC20 } from "../types/contracts";
// import erc20Config from "../configs/contracts/ERC20.json";

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

export async function transferAssets(req: AssetTransferRequest, res: Response, next: NextFunction) {
    try {
        // @todo - validate data
        const { token, data } = req.body;

        if (!token || !data)
            throw new AppError(400, "error", "Invalid request");

        let asset: string;
        // let decimals: number = 18;

        const totalAmount = data.reduce((sum, row) => { return sum + row.amount }, 0);

        // Native (ETH) transfer
        if (token == ethers.constants.AddressZero) {
            asset = Coinbase.assets.Eth;
            const balance = await wallet.getBalance(asset);
            if (balance.lessThan(totalAmount))
                throw new AppError(400, "error", "Insufficient balance");
        }
        // ERC20 Token Transfer
        else {
            // @temp - Custom Assets Unsupported
            // if (!ethers.utils.isAddress(token))
            //     throw new AppError(400, "error", "Invalid token");

            // const provider = new ethers.providers.JsonRpcProvider("https://sepolia.base.org");
            // const tokenInterface = new ethers.utils.Interface(erc20Config.abi);
            // const tokenContract = new ethers.Contract(token, tokenInterface, provider) as ERC20;
            // // Check if valid ERC20
            // try {
            //     decimals = await tokenContract.decimals();
            // } catch (err) {
            //     throw new AppError(400, "error", "Invalid token")
            // }
            // @todo - balance checks
            // asset = token;
            throw new AppError(400, "error", "Unsupported token");
        }

        let returnData = [];

        for await (const row of data) {
            try {
                const transfer = await wallet.createTransfer(row.amount, asset, row.wallet);
                returnData.push(transfer.getTransactionLink());
            } catch (err) {
                returnData.push("failed");
            }
        }

        return res.status(200).json({ transferStatus: returnData });
    } catch (error) {
        next(error);
    }
}

// @temp - Unsupported on Base Sepolia
// export async function swapAssets(req: Request, res: Response, next: NextFunction) {
//     try {
//         // @todo - validate data
//         const { from, to, amount } = req.body;

//         if (!from || !to || !amount)
//             throw new AppError(400, "error", "Invalid request");

//         const swap = await wallet.createTrade(amount, from, to);

//         return res.status(200).json(swap.getTransaction().getTransactionLink());
//     } catch (error) {
//         console.error("[controllers/wallet/swap] Failed: ", error);
//         next(error);
//     }
// }

