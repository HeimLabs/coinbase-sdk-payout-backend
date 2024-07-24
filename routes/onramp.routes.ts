import { Router } from "express";
import { createOnrampToken } from "../controllers";

const onrampRouter = Router();

onrampRouter.post("/create-token", createOnrampToken);

export default onrampRouter;
