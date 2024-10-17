import axios from 'axios';
import https from 'https';

export const analyzeContract = async (
  contract: string,
  setResults: any,
  setLoading: any
) => {
  setLoading(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Sanitize the contract string
  const sanitizedContract = contract
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
    .replace(/[\n\t]/g, ' ') // Replace newlines and tabs with spaces
    .replace(/"/g, '\\"') // Escape double quotes
    .trim();

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
            "details": "Suggestions for improving the smart contract in terms of security and performance and any other identified weaknesses"
          }
        ]

        Here is the smart contract: ${sanitizedContract}. Please do not include any additional text or context outside of the JSON array format. Thank you.`,
      },
    ],
  };

  const agent = new https.Agent({
    rejectUnauthorized: false,
    secureProtocol: 'TLSv1_2_method',
  });

  try {
    const response = await axios.post('https://api.together.xyz/v1/chat/completions', params, {
      httpsAgent: agent,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const content = response.data.choices[0].message.content;
    console.log("Raw API Response:", content); // Log the raw API response for debugging

    // Use regex to extract a valid JSON array from the response
    const match = content.match(/(\[.*?\])/s); // Match the first occurrence of a JSON array

    if (match) {
      const jsonArrayString = match[0].trim(); // Extract the matched JSON array string
      console.log("JSON String Before Parsing:", jsonArrayString);

      try {
        const auditResults = JSON.parse(jsonArrayString); // Attempt to parse the extracted string

        // Extract the "Audit Report" section
        const auditReport = Array.isArray(auditResults)
          ? auditResults.find((r: any) => r.section === "Audit Report")
          : null;

        console.log("Audit Report:", auditReport);

        if (auditReport) {
          setResults(auditReport.details);  // Only output the audit report details
        } else {
          setResults({ error: 'Audit report section not found', content });
        }
      } catch (error) {
        const parseError = error as Error;
        console.error('Error parsing JSON:', parseError.message);
        setResults({ error: 'Error parsing JSON', message: parseError.message });
      }
    } else {
      console.error('No valid JSON array found in response:', content);
      setResults({ error: 'No valid JSON array found in response', content });
    }
  } catch (error: any) {
    console.error('Error calling TogetherAI API:', error.response ? error.response.data : error.message);
    setResults({ error: 'Error calling API', message: error.message });
  } finally {
    setLoading(false);
  }
};


// import axios from 'axios';
// import https from 'https';

// export const analyzeContract = async (
//   contract: string,
//   setResults: any,
//   setLoading: any
// ) => {
//   setLoading(true);

//   const apiKey = process.env.NEXT_PUBLIC_API_KEY;

//   // Sanitize the contract string to remove control characters, newlines, and tabs
//   const sanitizedContract = contract
//     .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
//     .replace(/[\n\t]/g, ' ') // Replace newlines and tabs with spaces
//     .replace(/"/g, '\\"') // Escape double quotes
//     .trim();

//   const params = {
//     model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
//     messages: [
//       {
//         role: "user",
//         content: `Your role is to act as an AI Smart Contract Auditor. Please perform an audit on the following smart contract and provide the results strictly in the following array format:

//         [
//           {
//             "section": "Audit Report",
//             "details": "A detailed audit report of the smart contract, covering security, performance, and any other relevant aspects."
//           },
//           {
//             "section": "Metric Scores",
//             "details": [
//               {
//                 "metric": "Security",
//                 "score": 0
//               },
//               {
//                 "metric": "Performance",
//                 "score": 0
//               },
//               {
//                 "metric": "Other Key Areas",
//                 "score": 0
//               },
//               {
//                 "metric": "Gas Efficiency",
//                 "score": 0
//               },
//               {
//                 "metric": "Code Quality",
//                 "score": 0
//               },
//               {
//                 "metric": "Documentation",
//                 "score": 0
//               }
//             ]
//           },
//           {
//             "section": "Suggestions for Improvement",
//             "details": "Suggestions for improving the smart contract in terms of security and performance and any other identified weaknesses"
//           }
//         ]

//         Here is the smart contract: ${sanitizedContract}. Please do not include any additional text or context outside of the JSON array format. Thank you.`,
//       },
//     ],
//   };

//   const agent = new https.Agent({
//     rejectUnauthorized: false,
//     secureProtocol: 'TLSv1_2_method',
//   });

//   try {
//     const response = await axios.post('https://api.together.xyz/v1/chat/completions', params, {
//       httpsAgent: agent,
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     const content = response.data.choices[0].message.content;
//     console.log("Raw API Response:", content); // Log the raw API response for debugging

//     // Use regex to extract a valid JSON array from the response
//     const match = content.match(/\[(.*?)\]/s); // Match the first occurrence of a JSON array

//     if (match) {
//       const jsonArrayString = match[0].trim(); // Extract the matched JSON array string
//       console.log("JSON String Before Parsing:", jsonArrayString);

//       try {
//         const auditResults = JSON.parse(jsonArrayString); // Attempt to parse the extracted string

//         // Extract the "Audit Report" section
//         const auditReport = Array.isArray(auditResults)
//           ? auditResults.find((r: any) => r.section === "Audit Report")
//           : null;

//         console.log("Audit Report:", auditReport);

//         if (auditReport) {
//           setResults(auditReport.details);  // Only output the audit report details
//         } else {
//           setResults({ error: 'Audit report section not found', content });
//         }
//       } catch (error) {
//         // Type assertion to access error properties safely
//         const parseError = error as Error; // Assert the type to Error
//         console.error('Error parsing JSON:', parseError.message); // Access the message property
//         setResults({ error: 'Error parsing JSON', message: parseError.message });
//       }
//     } else {
//       console.error('No valid JSON array found in response:', content);
//       setResults({ error: 'No valid JSON array found in response', content });
//     }
//   } catch (error: any) {
//     console.error('Error calling TogetherAI API:', error.response ? error.response.data : error.message);
//     setResults({ error: 'Error calling API', message: error.message });
//   } finally {
//     setLoading(false);
//   }
// };
