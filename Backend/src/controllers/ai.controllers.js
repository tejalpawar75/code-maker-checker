const aiServices = require('../services/ai.services');

module.exports.getReview = async (req, res) => {
    
    const code=req.body.code ;
    // Check if prompt is provided
    if(!code) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    const response=await aiServices(code);

    res.send(response);
}