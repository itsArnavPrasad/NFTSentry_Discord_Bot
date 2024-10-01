# NFTSentry Discord Bot

## Add the Bot to Your Discord Server

[Click here to add the NFTSentry bot to your Discord server!](https://discord.com/oauth2/authorize?client_id=1290328040898826375)

## Overview

NFTSentry is a Discord bot designed to provide users with real-time information about the Bored Ape Yacht Club (BAYC) NFT collection. Utilizing GraphQL and The Graph's subgraphs technology, this bot enables users to access blockchain data seamlessly within their Discord servers.

## Features

- **Latest Transfers**: Fetch the latest 5 transfers of NFTs in the BAYC collection.
- **Transaction Search**: Look up specific transactions by hash to view detailed transfer information.
- **NFT Details**: Get information about a specific NFT by token ID, including its current owner and the last transaction hash.
- **Help Command**: Displays all available commands with their descriptions to assist users.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **Discord Account**: You will need a Discord account to create and test your bot.
- **Discord Bot Token**: Create a bot on the Discord Developer Portal and obtain your bot token.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/nftsentry.git
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

- **/latest_transfers**: Get the 5 latest transfers of the BAYC collection.
- **/search_transaction \[hash\]**: Search a transaction by its hash.
- **/nft_details \[token_id\]**: Get details of an NFT by its token ID.
- **/help**: Show all available commands and their descriptions.

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## Contact

For any inquiries or support, you can reach out to me on:

- **Twitter**: [@ArnavPrasa89325](https://x.com/ArnavPrasa89325)
- **LinkedIn**: [Arnav Prasad](https://www.linkedin.com/in/thearnavprasad/)
- **GitHub**: [itsArnavPrasad](https://github.com/itsArnavPrasad/)
