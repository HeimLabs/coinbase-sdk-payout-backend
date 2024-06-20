import fs from "fs";

interface SeedConfig {
    [key: string]: {
        seed: string;
        encrypted: boolean;
        authTag: string;
        iv: string;
    };
}

interface TransformedConfig {
    walletId: string;
    seed: string;
}

export const transformConfig = (filePath: string): TransformedConfig => {
    try {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const originalConfig: SeedConfig = JSON.parse(rawData);

        const walletId = Object.keys(originalConfig)[0];
        const { seed } = originalConfig[walletId];

        return {
            walletId,
            seed
        };
    } catch (error) {
        console.error('Error reading or parsing file:', error);
        throw error;
    }
}