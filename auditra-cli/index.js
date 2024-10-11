#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import { analyzeContract } from "./src/ai-prompt.js"; // Use .js extension
import fs from "fs";
import path from "path";
import dotenv from "dotenv"; // Import dotenv

dotenv.config(); // Initialize dotenv

const program = new Command();

program
  .name("auditai")
  .description("A CLI tool to audit smart contracts using TogetherAI") // Updated description
  .version("1.0.0");

const getApiKey = async () => {
  const { apiKey } = await inquirer.prompt([
    {
      type: "input",
      name: "apiKey",
      message: "Enter your TogetherAI API key:", // Updated prompt
      validate: (input) => input.length > 0 || "API key is required",
    },
  ]);
  return apiKey;
};

program
  .command("check <file>")
  .description("Analyze a smart contract")
  .action(async (file) => {
    try {
      const apiKey = await getApiKey();

      const contractPath = path.resolve(process.cwd(), file);
      console.log(`Checking file at path: ${contractPath}`);

      if (!fs.existsSync(contractPath)) {
        console.error(`File not found: ${contractPath}`);
        process.exit(1);
      }

      if (fs.statSync(contractPath).isDirectory()) {
        console.error(`Path is a directory, not a file: ${contractPath}`);
        process.exit(1);
      }

      const contract = fs.readFileSync(contractPath, "utf8");
      await analyzeContract(contract, apiKey); // No changes needed here if analyzeContract is updated
    } catch (error) {
      console.error("Error during analysis:", error.message);
    }
  });

program.parse(process.argv);


// #!/usr/bin/env node

// import { Command } from "commander";
// import inquirer from "inquirer";
// import { analyzeContract } from "./src/ai-prompt.js"; // Use .js extension
// import fs from "fs";
// import path from "path";
// import dotenv from "dotenv"; // Import dotenv

// dotenv.config(); // Initialize dotenv

// const program = new Command();

// program
//   .name("auditai")
//   .description("A CLI tool to audit smart contracts using OpenAI")
//   .version("1.0.0");

//   const getApiKey = async () => {
//     const { apiKey } = await inquirer.prompt([
//       {
//         type: "input",
//         name: "apiKey",
//         message: "Enter your OpenAI API key:",
//         validate: (input) => input.length > 0 || "API key is required",
//       },
//     ]);
//     return apiKey;
//   };

// program
//   .command("check <file>")
//   .description("Analyze a smart contract")
//   .action(async (file) => {
//     try {
//       const apiKey = await getApiKey();

//       const contractPath = path.resolve(process.cwd(), file);
//       console.log(`Checking file at path: ${contractPath}`);

//       if (!fs.existsSync(contractPath)) {
//         console.error(`File not found: ${contractPath}`);
//         process.exit(1);
//       }

//       if (fs.statSync(contractPath).isDirectory()) {
//         console.error(`Path is a directory, not a file: ${contractPath}`);
//         process.exit(1);
//       }

//       const contract = fs.readFileSync(contractPath, "utf8");
//       await analyzeContract(contract, apiKey);
//     } catch (error) {
//       console.error("Error during analysis:", error.message);
//     }
//   });

// program.parse(process.argv);


