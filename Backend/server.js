const app= require('./src/app');
require('dotenv').config(); // Load environment variables from .env file

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});