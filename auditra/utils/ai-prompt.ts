import axios from 'axios';
import https from 'https';

export const analyzeContract = async (
  contract: string,
  setResults: any,
  setLoading: any
) => {
  setLoading(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const params = {
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages: [
      {
        role: "user",
        content: `Your role and goal is to be an AI Smart Contract Auditor. Your job is to perform an audit on the given smart contract. Here is the smart contract: ${contract}.
        
        Please provide the results in the following array format for easy front-end display:

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
                "score": 0-10
              },
              {
                "metric": "Performance",
                "score": 0-10
              },
              {
                "metric": "Other Key Areas",
                "score": 0-10
              },
              {
                "metric": "Gas Efficiency",
                "score": 0-10
              },
              {
                "metric": "Code Quality",
                "score": 0-10
              },
              {
                "metric": "Documentation",
                "score": 0-10
              }
            ]
          },
          {
            "section": "Suggestions for Improvement",
            "details": "Suggestions for improving the smart contract in terms of security, performance, and any other identified weaknesses."
          }
        ]
        
        Thank you.`,
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

    // Log the raw response data to inspect what is returned
    //console.log('Raw response:', response.data);

    // Try to parse response data only if it looks like valid JSON
    const content = response.data.choices[0].message.content;

    // Check if the content starts with '{' or '[' which indicates a valid JSON structure
    if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
      const auditResults = JSON.parse(content);

      // Additional check to ensure auditResults is an array
      if (Array.isArray(auditResults)) {
        setResults(auditResults);
      } else {
        console.error('Parsed content is not an array:', auditResults);
        setResults({ error: 'Parsed content is not an array', content });
      }
    } else {
      // If not valid JSON, show the raw response for debugging purposes
      console.error('API returned non-JSON content:', content);
      setResults({ error: 'API returned non-JSON content', content });
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

//   const apiKey=process.env.NEXT_PUBLIC_API_KEY;

//   const params = {
//     model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
//     messages: [
//       {
//         role: "user",
//         content: `Your role and goal is to be an AI Smart Contract Auditor. Your job is to perform an audit on the given smart contract. Here is the smart contract: ${contract}.
        
//         Please provide the results in the following array format for easy front-end display:

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
//                 "score": 0-10
//               },
//               {
//                 "metric": "Performance",
//                 "score": 0-10
//               },
//               {
//                 "metric": "Other Key Areas",
//                 "score": 0-10
//               },
//               {
//                 "metric": "Gas Efficiency",
//                 "score": 0-10
//               },
//               {
//                 "metric": "Code Quality",
//                 "score": 0-10
//               },
//               {
//                 "metric": "Documentation",
//                 "score": 0-10
//               }
//             ]
//           },
//           {
//             "section": "Suggestions for Improvement",
//             "details": "Suggestions for improving the smart contract in terms of security, performance, and any other identified weaknesses."
//           }
//         ]
        
//         Thank you.`,
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
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     const auditResults = JSON.parse(response.data.choices[0].message.content);
//     setResults(auditResults);
//   } catch (error: any) {
//     console.error('Error calling TogetherAI API:', error.response ? error.response.data : error.message);
//   } finally {
//     setLoading(false);
//   }
// };
