import { Router } from "express";
import { sponsor } from "../controllers";

const paymasterRouter = Router();

paymasterRouter.all("/", sponsor);

export default paymasterRouter;
