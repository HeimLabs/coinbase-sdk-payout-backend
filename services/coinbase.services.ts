import { Coinbase } from "@coinbase/coinbase-sdk";
import { Wallet } from "@coinbase/coinbase-sdk/dist/coinbase/wallet";
import fs from "fs";
import { transformConfig } from "../utils/coinbase.utils";

let coinbase: Coinbase = Coinbase.configureFromJson({ filePath: 'cdp_api_key.json' });

let wallet: Wallet;

const seedPath = "wallet_seed.json";

const setupCoinbase = async () => {
    try {
        const user = await coinbase.getDefaultUser();
        let address;

        // If Wallet exists
        if (fs.existsSync(seedPath)) {
            console.log("[coinbase/setup] 🔄 Wallet exists, re-instantiating...");
            const seedData = transformConfig(seedPath);
            wallet = await user.importWallet(seedData);
            console.log("[coinbase/setup] ✅ Wallet re-instantiated!");
        }
        // Create Wallet
        else {
            wallet = await user.createWallet();
            const saveSeed = wallet.saveSeed(seedPath);
            console.log("[coinbase/setup] ✅ Seed saved: ", saveSeed);
        }

        address = wallet.getDefaultAddress();
        const nativeBalance = await wallet?.getBalance(Coinbase.assets.Eth);

        if (nativeBalance?.eq(0)) {
            console.log("[coinbase/setup] 🔄 Funding...");
            const faucetTxn = await wallet?.faucet();
            console.log("[coinbase/setup] ✅ Funded: ", faucetTxn);
        }
    } catch (err) {
        console.error("[coinbase/setup] ❌ Failed to setup Coinbase SDK");
        console.error(err);
        throw err;
    }
}

export { setupCoinbase, wallet };