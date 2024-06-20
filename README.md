# Coinbase SDK Payout Backend

![NodeJs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Coinbase](https://img.shields.io/badge/Coinbase-0052FF?style=for-the-badge&logo=Coinbase&logoColor=white)

<hr/>

### Prerequisites

- [Node](https://nodejs.org/en/download)

### Installation

```bash
npm i
```

- Fill in the environment variables in the `.env` file, refer to the `.env.example` file for the required variables.
- Create a [CDP API key](https://portal.cdp.coinbase.com/access/api) and save it as `cdp_api_key.json` in the root of the repository, refer to [cdp_api_key.example.json](./cdp_api_key.example.json).

---
### Usage `(in development mode)`

Start the Express Server

```bash
npm run dev
```
---

### Usage `(in production mode)`

Build the project

```bash
npm run build
```

Start the Express Server

```bash
npm start
```
