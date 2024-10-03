# NFTSentry Discord Bot

## Add the Bot to Your Discord Server

[Click here to add the NFTSentry bot to your Discord server!](https://discord.com/oauth2/authorize?client_id=1290328040898826375)

## Overview

NFTSentry is a Discord bot designed to provide users with real-time information about the Bored Ape Yacht Club (BAYC) NFT collection. Utilizing GraphQL and [The Graph's](https://thegraph.com/) subgraphs technology, this bot enables users to access blockchain data seamlessly within their Discord servers. The bot is hosted and deployed through [Railway App](https://railway.app/) to ensure round the clock up-time.

## Features

- **Latest Transfers**: Retrieve the 5 most recent NFT transfers from the BAYC collection, including token ID, sender, receiver, transaction hash, and timestamp.
- **Transaction Search**: Search for detailed information about a specific transaction using its hash, with details such as token ID, sender, receiver, transaction hash, timestamp, and an image of the NFT.
- **NFT Details**: Get comprehensive information on an NFT by its token ID, including its attributes and a link to its Etherscan page.
- **Ownership History**: View the complete ownership history of an NFT, including previous owners, transaction hashes, timestamps, and the NFT image.
- **Current Ownership**: Check the current owner of a specific NFT by its token ID, with the latest transaction details and the NFT image.
- **Help Command**: Display a list of all available bot commands with their descriptions to guide users on how to interact with the bot.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **Discord Account**: You will need a Discord account to create and test your bot.
- **Discord Bot Token**: Create a bot on the Discord Developer Portal and obtain your bot token.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/itsArnavPrasad/NFTSentry_Discord_Bot.git
   cd nftsentry
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Create a .env File:** In the root directory of the project, create a .env file and add your bot token, bot client id, and the given graphql endpoint from The Graph:
   ```makeafile
   DISCORD_BOT_TOKEN=YOUR_BOT_TOKEN
   CLIENT_ID=BOT_CLIENT_ID
   GRAPHQL_ENDPOINT=https://api.studio.thegraph.com/query/90253/boredapeyachtclub-bayc/version/latest
   ```

### Configuration

1. **Set Up Your Discord Bot**:

   - Go to the Discord Developer Portal.
   - Create a new application and navigate to the "Bot" tab to add a bot to your application.
   - Under the "Bot" settings, copy the token and paste it in your `.env` file.

2. **Invite the Bot to Your Server**:
   - In the "OAuth2" tab of your application, under "Scopes", select `bot`.
   - Under "Bot Permissions", select the permissions your bot needs (e.g., `Send Messages`, `Read Message History`).
   - Copy the generated URL and paste it into your browser to invite the bot to your Discord server.

### Running the Bot

To start the bot, use the following command:

```bash
node index.mjs
```

Once running, the bot will log in and indicate it is online. You can now use the commands in your Discord server.

## Commands

### `/latest_transfers`

- **Description**: Get the 5 latest transfers of the BAYC collection.
- **Response**: A detailed embed with information on the 5 latest transfers, including the token ID, sender, receiver, transaction hash, and timestamp.

### `/search_transaction [hash]`

- **Description**: Search for details of a specific transaction by its hash.
- **Response**: An embed containing transaction details such as token ID, from address, to address, transaction hash, timestamp, and a link to the transaction on Etherscan. An image of the NFT is also included.

### `/nft_details [token_id]`

- **Description**: Get detailed information about an NFT by its token ID.
- **Response**: An embed with details like token ID, NFT attributes, and a link to the NFT's Etherscan page. Includes an image of the NFT.

### `/current_owner [token_id]`

- **Description**: Fetch the current owner of a specific NFT by token ID.
- **Response**: An embed showing the token ID, current owner, and the last transaction hash, along with the NFT image.

### `/owner_history [token_id]`

- **Description**: View the ownership history of a specific NFT by token ID.
- **Response**: An embed showing the transfer history for the NFT, including details like previous owners, transaction hashes, timestamps, and the NFT image.

### `/help_nftsentry`

- **Description**: Display a list of available commands and their descriptions.
- **Response**: An embed with the list of all available commands and links to my social media accounts.

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## Contact

For any inquiries or support, you can reach out to me on:

- **Twitter**: [@ArnavPrasa89325](https://x.com/ArnavPrasa89325)
- **LinkedIn**: [Arnav Prasad](https://www.linkedin.com/in/thearnavprasad/)
- **GitHub**: [itsArnavPrasad](https://github.com/itsArnavPrasad/)
