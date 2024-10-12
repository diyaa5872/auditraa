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
        Please provide the results in a formatted text, as follows:
        
        Audit Report:
        <audit_report_details>
        
        Metric Scores:
        Security: <security_score>/10
        Performance: <performance_score>/10
        Other Key Areas: <other_key_areas_score>/10
        Gas Efficiency: <gas_efficiency_score>/10
        Code Quality: <code_quality_score>/10
        Documentation: <documentation_score>/10
        
        Suggestions for Improvement:
        <improvement_suggestions>
        
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

    const auditResults = response.data.choices[0].message.content;

    // Log the raw content to inspect it
    console.log( auditResults);

  } catch (error) {
    console.error('Error calling TogetherAI API:', error.response ? error.response.data : error.message);
  }
};


