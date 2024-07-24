import { Router } from "express";
import { errorHandler, healthCheck, notFound } from "../controllers";
import walletRouter from "./wallet.routes";
import paymasterRouter from "./paymaster.routes";
import onrampRouter from "./onramp.routes";

const router = Router();

router.get("/", healthCheck);

router.use("/wallet", walletRouter);

router.use("/paymaster", paymasterRouter);

router.use("/onramp", onrampRouter);

router.all("*", notFound);

router.use(errorHandler);

export default router;
