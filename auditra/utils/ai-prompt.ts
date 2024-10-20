import axios from "axios";
import https from "https";

export const analyzeContract = async (
  contract: string,
  setResults: any,
  setLoading: any
) => {
  setLoading(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Sanitize the contract string
  const sanitizedContract = contract
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
    .replace(/[\n\t]/g, " ") // Replace newlines and tabs with spaces
    .replace(/"/g, '\\"') // Escape double quotes
    .replace(/'/g, "\\'") // Escape single quotes
    .trim();

  console.log("Sanitized Contract:", sanitizedContract);

  const params = {
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages: [
      {
        role: "user",
        content: `Your role is to act as an AI Smart Contract Auditor. Please perform an audit on the following smart contract and provide the results strictly in the following array format:

        [
          {
            "section": "Audit Report",
            "details": "A detailed audit report of the smart contract, covering security, performance, and any other relevant aspects."
          },
          {
            "section": "Metric Scores",
            "details": [
              {
                "metric": "Security",
                "score": 0
              },
              {
                "metric": "Performance",
                "score": 0
              },
              {
                "metric": "Other Key Areas",
                "score": 0
              },
              {
                "metric": "Gas Efficiency",
                "score": 0
              },
              {
                "metric": "Code Quality",
                "score": 0
              },
              {
                "metric": "Documentation",
                "score": 0
              }
            ]
          },
          {
            "section": "Suggestions for Improvement",
            "details": "Here are some suggestions for improving the smart contract. Give only Four(4) major suggestions and all 4 suggestions in a single array."
          }
        ],

        Here is the smart contract: ${sanitizedContract}. Please do not include any additional text or context outside of the JSON array format. Thank you.`,
      },
    ],
  };

  const agent = new https.Agent({
    rejectUnauthorized: false,
    secureProtocol: "TLSv1_2_method",
  });

  try {
    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      params,
      {
        httpsAgent: agent,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;
    console.log("Raw API Response:", content); // Log raw API response

    // Use regex to extract the JSON array from the response
    const match = content.match(/\[.*\]/s); // Match any JSON array in the content

    if (match) {
      const jsonArrayString = match[0].trim();
      console.log("Extracted JSON String:", jsonArrayString);

      try {
        const auditResults = JSON.parse(jsonArrayString); // Parse the extracted JSON
        console.log("Parsed Audit Results:", auditResults);

        // Extract "Audit Report" section
        const auditReport = auditResults.find(
          (r: any) => r.section === "Audit Report"
        );
        console.log("Extracted Audit Report:", auditReport);

        const metricScores = auditResults.find(
          (r: any) => r.section === "Metric Scores"
        );
        console.log("Extracted Metric Scores:", metricScores);

        // Extract "Suggestions for Improvement" section
        const suggestions = auditResults.find(
          (r: any) => r.section === "Suggestions for Improvement"
        );
        console.log("Extracted Suggestions for Improvement:", suggestions);

        // Array to store details from both sections
        const detailsArray = [];

        // If "Audit Report" exists, add its details to the array
        if (auditReport) {
          detailsArray.push({
            section: "Audit Report",
            details: auditReport.details,
          });
        } else {
          console.log("Audit report section not found");
        }

        // If "Metric Scores" exists, add its details to the array
        if (metricScores) {
          detailsArray.push({
            section: "Metric Scores",
            details: metricScores.details,
          });
        } else {
          console.log("Metric Scores section not found");
        }

        // If "Suggestions for Improvement" exists, add its details to the array
        if (suggestions) {
          detailsArray.push({
            section: "Suggestions for Improvement",
            details: suggestions.details,
          });
        } else {
          console.log("Suggestions for Improvement section not found");
        }

        // Store the results in state
        setResults(detailsArray); // Set the array containing both sections' details
        console.log("Final Details Array:", detailsArray);

        // if (auditReport) {
        //   setResults(auditReport.details); // Set only the audit report details
        //   console.log(auditReport);
        // } else {
        //   setResults({ error: "Audit report section not found", content });
        // }
      } catch (error: any) {
        console.error("Error parsing JSON:", error.message);
        setResults({ error: "Error parsing JSON", message: error.message });
      }
    } else {
      console.error("No valid JSON array found in the response:", content);
      setResults({ error: "No valid JSON array found in response", content });
    }
  } catch (error: any) {
    console.error(
      " Error calling TogetherAI API:",
      error.response ? error.response.data : error.message
    );
    setResults({ error: "Error calling API", message: error.message });
  } finally {
    setLoading(false);
  }
};
