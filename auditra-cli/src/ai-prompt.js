import axios from 'axios';
import https from 'https';

export const analyzeContract = async (contract, apiKey) => {
  process.env.NODE_OPTIONS = '--tls-min-v1.2';

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
                "score": 0  // Replace with actual score logic
              },
              {
                "metric": "Performance",
                "score": 0  // Replace with actual score logic
              },
              {
                "metric": "Other Key Areas",
                "score": 0  // Replace with actual score logic
              },
              {
                "metric": "Gas Efficiency",
                "score": 0  // Replace with actual score logic
              },
              {
                "metric": "Code Quality",
                "score": 0  // Replace with actual score logic
              },
              {
                "metric": "Documentation",
                "score": 0  // Replace with actual score logic
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
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Log the entire response to inspect its structure
    //console.log('Response from TogetherAI:', response.data);

    // Extract the content from the response
    const auditResults = response.data.choices[0].message.content;

    // Log the raw content to inspect it
    //console.log('Raw audit results:', auditResults);

    // Remove the JSON parsing logic and just print the raw results
    // Ensure to trim the string if necessary
    const trimmedResults = auditResults.trim();
    console.log(trimmedResults); // This will print only the raw results
  } catch (error) {
    console.error('Error calling TogetherAI API:', error.response ? error.response.data : error.message);
  }
};


// import axios from 'axios';

// export const analyzeContract = async (contract, apiKey) => {

//   process.env.NODE_OPTIONS = '--tls-min-v1.2';

//   const params = {
//     model: "gpt-3.5-turbo",  // or whatever model TogetherAI uses
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
//                 "score": 0  // Replace with actual score logic
//               },
//               {
//                 "metric": "Performance",
//                 "score": 0  // Replace with actual score logic
//               },
//               {
//                 "metric": "Other Key Areas",
//                 "score": 0  // Replace with actual score logic
//               },
//               {
//                 "metric": "Gas Efficiency",
//                 "score": 0  // Replace with actual score logic
//               },
//               {
//                 "metric": "Code Quality",
//                 "score": 0  // Replace with actual score logic
//               },
//               {
//                 "metric": "Documentation",
//                 "score": 0  // Replace with actual score logic
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

//   try {
//     const response = await axios.post('https://api.togetherai.com/analyze', params, {
//       headers: {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json',
//         'User-Agent': 'Auditra-cli',
//         'rejectUnauthorized': 'false'
//       },
//     });

//     const auditResults = response.data; // Adjust according to the response structure

//     console.log("Audit Report:");
//     console.log(auditResults.find((r) => r.section === "Audit Report").details);

//     console.log("\nMetric Scores:");
//     auditResults
//       .find((r) => r.section === "Metric Scores")
//       .details.forEach((metric) => {
//         console.log(`${metric.metric}: ${metric.score}/10`);
//       });

//     console.log("\nSuggestions for Improvement:");
//     console.log(
//       auditResults.find((r) => r.section === "Suggestions for Improvement").details
//     );
//   } catch (error) {
//     console.error('Error calling TogetherAI API:', error.response ? error.response.data : error.message);
//   }
// };


// import OpenAI from 'openai';

// export const analyzeContract = async (contract, apiKey) => {
//   const openai = new OpenAI({
//     apiKey: apiKey,
//   });

//   const params = {
//     model: "gpt-3.5-turbo",
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

//   const chatCompletion = await openai.chat.completions.create(params);

//   const auditResults = JSON.parse(chatCompletion.choices[0].message.content);

//   console.log("Audit Report:");
//   console.log(auditResults.find((r) => r.section === "Audit Report").details);

//   console.log("\nMetric Scores:");
//   auditResults
//     .find((r) => r.section === "Metric Scores")
//     .details.forEach((metric) => {
//       console.log(`${metric.metric}: ${metric.score}/10`);
//     });

//   console.log("\nSuggestions for Improvement:");
//   console.log(
//     auditResults.find((r) => r.section === "Suggestions for Improvement")
//       .details
//   );
// };



// // import OpenAI from 'openai';

// // export const analyzeContract= async(contract,apiKey)=>{//added export word here
// //     const openai = new OpenAI({
// //         apiKey: apiKey,
// //     });

// //     const params={
// //         model: 'gpt-3.5-turbo',
// //         messages:[
// //             {
// //                 role: 'user',//chnaged roles to role here
// //                 content: `
// //                    Your role and goal is to be an AI smart contract auditoy. your job is to perform an audit. your job is to give smart contract: ${contract}

// //                    please provide the results in the following array format for an easy front-end display.
// //                    [
// //                       {
// //                         'section':'Audit Report',
// //                         'details':'A detailed audit report of the smart contract, covering secuirity ,performance and any other relevent aspect ',      
// //                       },
// //                       {
// //                         'section':'Metric Scores',
// //                         'details': [
// //                           {
// //                             'metric': 'Security',
// //                             'score': 0-10,
// //                           },
// //                           {
// //                             'metric':'performance',
// //                             'score':0-10
// //                           },
// //                           {
// //                             'metric':'Other Key Areas',
// //                             'score':0-10
// //                           },
// //                           {
// //                             'metric':'Gas Efficiency',
// //                             'score':0-10
// //                           },
// //                           {
// //                             'metric':'Code Quality',
// //                             'score':0-10
// //                           },
// //                           {
// //                             'metric':'Documentation',
// //                             'score':0-10
// //                           }
// //                         ]
// //                       },
// //                       {
// //                       'section':'Suggestions for improvement',
// //                       'details': 'Suggestions for improving the Smart contract in terms of security, performance, and any other identified weaknesses'
// //                       }
// //                    ]
// //                     Thank You
// //                 `,
// //             },
// //         ],
// //     };

// //     const chatCompletion=await openai.chat.chatCompletion.create(params);

// //     const auditResults=JSON.parse(chatCompletion.choices[0].message.content)

// //     console.log('Audit Reports');

// //     console.log(auditResults.find((r)=> r.section==='Audit Reports').details)

// //     console.log('\nMetric Scores');

// //     auditResults.find((r)=> r.section==='Metric Scores').details.forEach((metric)=>{
// //         console.log(`${metric.score}/10`)
// //     })

// //     console.log("\nSuggestions for improvemnet");
// //     console.log(auditResults.find((r)=>r.section==='Suggestions for improvement').details)
    
// // }