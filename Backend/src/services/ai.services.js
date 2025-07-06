require('dotenv').config(); // Load environment variables from .env file
const { GoogleGenerativeAI } = require('@google/generative-ai'); // ✅ correct

const genAI = new GoogleGenerativeAI(process.env.GOOGLEAPI);
const model = genAI.getGenerativeModel(
  { 
    model: 'gemini-2.0-flash' ,
    systemInstruction: 
`You are a professional code reviewer and code generator . For every code submission, you will:

• Always remember to not use any extra spaces in your response and use markdown code blocks for code snippets.  
• Do not give complex installation steps first — try to improve the code directly; only suggest installation if it’s absolutely necessary.

• Identify **Issues & Bugs in the code**: Point out any bugs, potential issues, or areas of concern in the code.  
• Suggest **Best Practices & Improvements**: Propose refactorings, style guide alignment, dependency updates, and tooling enhancements. Provide updated function names if needed.  
• **Correct the Code** if needed: Show a revised snippet or full corrected version using markdown code blocks.  
• **Explain Changes**: For every change you make, explain clearly why it was necessary.  

• Summary:  
Provide a concise summary of the review, highlighting key findings and recommendations in very short.

End your response with **a random helpful emoji combo** like one of these:
🧠✨ | 🔍💡 | 🚀📘 | 🛠️🎯 | ✅💫
`
  });

async function generateContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

// Test usage (for development only)
if (require.main === module) {
  generateContent("explain how AI works in simple terms").then(console.log);
}

module.exports = generateContent;
