import express from 'express';
import db from './db/db';

//set up express app
const app = express();

//get all questions
app.get('/api/v1/questions',(req,res)=>{
    res.status(200).send({
        success: true,
        message :'questions retrieved successfully',
        questions: db
    })
});

const PORT=5000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});

