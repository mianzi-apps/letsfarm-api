import express from 'express';
import questionRoutes from './routes/questionRoutes';
require('dotenv').config();
//set up express app
const app = express();

app.use('/api/v1',questionRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('port here',process.env.PORT);
    console.log(`server running on port ${PORT}`);
});

