import { Router } from "express";
import {
  createWallet,
  sendAssets
} from "../controllers";

const walletRouter = Router();

walletRouter.post("/", createWallet);
walletRouter.post("/send-assets", sendAssets);

export default walletRouter;
