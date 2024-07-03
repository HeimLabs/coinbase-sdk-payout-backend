import { createClient, http } from "viem";
import { base, baseSepolia } from "viem/chains";
import { ENTRYPOINT_ADDRESS_V06 } from "permissionless";
import { paymasterActionsEip7677 } from "permissionless/experimental";

const paymasterService = process.env.PAYMASTER_SERVICE_URL!;

export const paymasterClient = createClient({
    chain: process.env.APP_ENV == "production" ? base : baseSepolia,
    transport: http(paymasterService),
}).extend(paymasterActionsEip7677(ENTRYPOINT_ADDRESS_V06));