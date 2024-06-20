import { Router } from "express";
import {
  getWallet,
  sendAssets
} from "../controllers";

const walletRouter = Router();

walletRouter.get("/", getWallet);
walletRouter.post("/send-assets", sendAssets);

export default walletRouter;
