const OpenAI= require('openai');

const analyzeContract= async(contract,apiKey)=>{
    const openai = new OpenAI({
        apiKey: apiKey,
    });

    const params={
        model: 'gpt-3.5-turbo',
        messages:[
            {
                roles: 'user',
                content: `
                   Your role and goal is to be an AI smart contract auditoy. your job is to perform an audit. your job is to give smart contract: ${contract}

                   please provide the results in the following array format for an easy front-end display.
                   [
                      {
                        'section':'Audit Report',
                        'details':'A detailed audit report of the smart contract, covering secuirity ,performance and any other relevent aspect ',      
                      },
                      {
                        'section':'Metric Scores',
                        'details': [
                          {
                            'metric': 'Security',
                            'score': 0-10,
                          },
                          {
                            'metric':'performance',
                            'score':0-10
                          },
                          {
                            'metric':'Other Key Areas',
                            'score':0-10
                          },
                          {
                            'metric':'Gas Efficiency',
                            'score':0-10
                          },
                          {
                            'metric':'Code Quality',
                            'score':0-10
                          },
                          {
                            'metric':'Documentation',
                            'score':0-10
                          }
                        ]
                      },
                      {
                      'section':'Suggestions for improvement',
                      'details': 'Suggestions for improving the Smart contract in terms of security, performance, and any other identified weaknesses'
                      }
                   ]
                    Thank You
                `,
            },
        ],
    };

    const chatCompletion=await openai.chat.chatCompletion.create(params)

    const auditResults=JSON.parse(chatCompletion.choices[0].message.content)

    console.log('Audit Reports');

    console.log(auditResults.find((r)=> r.section==='Audit Reports').details)

    console.log('\nMetric Scores');

    auditResults.find((r)=> r.section==='Metric Scores').details.forEach((metric)=>{
        console.log(`${metric.score}/10`)
    })

    console.log("\nSuggestions for improvemnet");
    console.log(auditResults.find((r)=>r.section==='Suggestions for improvement').details)

    module.exports={analyzeContract};
    
}