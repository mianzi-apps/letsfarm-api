import express from 'express';
import questionRoutes from './routes/questionRoutes';
//set up express app
const app = express();

app.use('/api/v1',questionRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});

