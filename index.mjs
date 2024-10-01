import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { config } from "dotenv";
import { graphqlQuery } from "./yourGraphqlFunctions.mjs";

import pkg from "discord.js";
const { EmbedBuilder } = pkg;

config(); // Load environment variables
const hideResponseFromAll = false;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Replace these with your actual IDs
const clientId = "1290328040898826375"; // Your Client ID here
const colourOfEmbed = "#0099ff";

const commands = [
  {
    name: "latest_transfers",
    description: "Get the 5 latest transfers of the BAYC Collection",
  },
  {
    name: "search_transaction",
    description: "Search a transaction of the BAYC Collection by hash",
    options: [
      {
        type: 3, // STRING type
        name: "hash",
        description: "The transaction hash",
        required: true,
      },
    ],
  },
  {
    name: "nft_details", // New command
    description: "Get details of an BAYC NFT by token ID",
    options: [
      {
        type: 3, // STRING type
        name: "token_id",
        description: "The NFT token ID",
        required: true,
      },
    ],
  },
  {
    name: "help_nftsentry",
    description: "Show all available commands",
  },
];

// Register commands
const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

client.once("ready", () => {
  console.log("NFTSentry is online!");
});

// Handle command interactions
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "latest_transfers") {
    const query = `
      {
        transfers(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
          from
          to
          tokenId
          transactionHash
          blockTimestamp
        }
      }
    `;

    try {
      const result = await graphqlQuery(query);
      if (result && result.transfers.length > 0) {
        // Create a new embed for the latest transfers
        const embed = new EmbedBuilder()
          .setColor(colourOfEmbed) // Set the embed color
          .setTitle("Latest 5 Transfers") // Title of the embed
          .setTimestamp() // Add a timestamp
          .setFooter({ text: "NFTSentry" }); // Footer

        // Loop through the transfers and add them to the embed
        result.transfers.forEach((transfer, index) => {
          embed.addFields({
            name: `Transfer #${index + 1}`,
            value: `**From:** ${transfer.from}\n**To:** ${
              transfer.to
            }\n**Token ID:** ${transfer.tokenId}\n**Transaction Hash:** ${
              transfer.transactionHash
            }\n**Timestamp:** ${new Date(
              transfer.blockTimestamp * 1000
            ).toLocaleString()}`,
            inline: false,
          });
        });

        // Send the embed response
        await interaction.reply({
          embeds: [embed],
          ephemeral: hideResponseFromAll,
        });
      } else {
        await interaction.reply({
          content: "No transfers found.",
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error("Error retrieving latest transfers:", error);
      await interaction.reply({
        content: "There was an error retrieving the latest transfers.",
        ephemeral: true,
      });
    }
  } else if (commandName === "search_transaction") {
    const transactionHash = options.getString("hash");

    // GraphQL query to fetch the transfer details for the given transaction hash
    const query = `
      {
        transfers(where: { transactionHash: "${transactionHash}" }) {
          from
          to
          tokenId
          blockTimestamp
          transactionHash
        }
      }
    `;

    try {
      const result = await graphqlQuery(query);

      if (result && result.transfers.length > 0) {
        const transfer = result.transfers[0]; // expect only 1 result

        // PNG of NFT URL
        const imageUrl = `https://storage.googleapis.com/nftimagebucket/tokens/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/preview/${transfer.tokenId}.png`;

        const embed = new EmbedBuilder()
          .setColor(colourOfEmbed) // Set the color of the embed
          .setTitle("Transaction Details") // Title of the embed
          .setImage(imageUrl) // Add the NFT image
          .addFields(
            {
              name: "Transaction Hash",
              value: transfer.transactionHash,
              inline: true,
            },
            { name: "From", value: transfer.from, inline: true },
            { name: "To", value: transfer.to, inline: true },
            { name: "Token ID", value: transfer.tokenId, inline: true },
            {
              name: "Timestamp",
              value: new Date(transfer.blockTimestamp * 1000).toLocaleString(),
              inline: true,
            }
          )
          .setTimestamp() // Add a timestamp
          .setFooter({ text: "NFTSentry" }); // Footer

        // Send the embed response
        await interaction.reply({
          embeds: [embed],
          ephemeral: hideResponseFromAll,
        });
      } else {
        await interaction.reply({
          content: `No transaction found for hash: ${transactionHash}.`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error("Error retrieving transaction details:", error);
      await interaction.reply({
        content: "There was an error retrieving the transaction details.",
        ephemeral: true,
      });
    }
  } else if (commandName === "nft_details") {
    const tokenId = options.getString("token_id");
    const query = `
      {
        transfers(first: 1, where: { tokenId: "${tokenId}" }, orderBy: blockTimestamp, orderDirection: desc) {
          from
          to
          tokenId
          transactionHash
        }
      }
    `;

    try {
      const result = await graphqlQuery(query);
      if (result && result.transfers.length > 0) {
        const transfer = result.transfers[0];

        // Construct the image URL using the provided format
        const imageUrl = `https://storage.googleapis.com/nftimagebucket/tokens/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/preview/${tokenId}.png`;

        // Create a new embed instance using EmbedBuilder
        const embed = new EmbedBuilder()
          .setColor(colourOfEmbed) // Set the embed color
          .setTitle("NFT Details") // Set the title of the embed
          .setImage(imageUrl) // Add the NFT image
          .addFields(
            // Use addFields method to add multiple fields
            { name: "**Token ID:**", value: transfer.tokenId, inline: true },
            { name: "**Current Owner:**", value: transfer.to, inline: true },
            // { name: "**Previous Owner:**", value: transfer.from, inline: true },
            {
              name: "**Last Transaction Hash:**",
              value: transfer.transactionHash,
              inline: true,
            }
          )
          .setTimestamp(); // Optionally, add a timestamp

        await interaction.reply({
          embeds: [embed],
          ephemeral: hideResponseFromAll,
        });
      } else {
        await interaction.reply({
          content: "No transfers found for this token ID.",
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error("Error retrieving NFT details:", error);
      await interaction.reply({
        content: "There was an error retrieving the NFT details.",
        ephemeral: true,
      });
    }
  } else if (commandName === "help_nftsentry") {
    // Create a formatted string of commands
    const commandList = commands
      .map((cmd) => `***${cmd.name}*** : ${cmd.description}`)
      .join("\n\n");

    // Add your social media links
    const socialLinks = `
      \n**Follow me on social media:**
      - Twitter: [@ArnavPrasa89325](https://x.com/ArnavPrasa89325)\n
      - LinkedIn: [Arnav Prasad](https://www.linkedin.com/in/thearnavprasad/)\n
      - GitHub: [itsArnavPrasad](https://github.com/itsArnavPrasad)\n
    `;

    const embed = new EmbedBuilder()
      .setColor("#0099ff") // Set the embed color
      .setTitle("Help NFTSentry") // Title of the embed
      .setDescription(commandList + socialLinks) // List of commands and social links
      .setTimestamp() // Add a timestamp
      .setFooter({ text: "NFTSentry, a project by arnav prasad." }); // Footer

    await interaction.reply({
      embeds: [embed],
      ephemeral: hideResponseFromAll, // Change to false if you want it visible to everyone
    });
  }
});

// Log in to Discord with your bot token
client.login(process.env.DISCORD_BOT_TOKEN);
