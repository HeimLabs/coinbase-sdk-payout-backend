import { Router } from "express";
import {
  getWallet,
  transferAssets,
  // swapAssets
} from "../controllers";

const walletRouter = Router();

walletRouter.get("/", getWallet);
walletRouter.post("/transfer-assets", transferAssets);
// @temp - Unsupported on Base Sepolia
// walletRouter.post("/swap-assets", swapAssets);

export default walletRouter;
