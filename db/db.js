const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect',()=>{
    console.log('connected to the database');
});

const usersTbText = `
    CREATE TABLE IF NOT EXISTS 
        users(
             id UUID PRIMARY KEY,
             display_name VARCHAR(50) NOT NULL,
             name VARCHAR(100) NOT NULL,
             email VARCHAR(70) NOT NULL UNIQUE,
             phone VARCHAR(30),
             password VARCHAR(200),
             auth_token VARCHAR(200),
             log_type VARCHAR(50),
             role TEXT, 
             created_at TIMESTAMP,
             updated_at TIMESTAMP
        )
`;

// sql string for creating tables
const questionsTbText = `
    CREATE TABLE IF NOT EXISTS 
    questions(
     id UUID PRIMARY KEY,
     title TEXT NOT NULL,
     body TEXT NOT NULL,
     created_by TEXT NOT NULL,
     created_at TIMESTAMP,
     updated_at TIMESTAMP
    )
`;


const answersTbText = `
    CREATE TABLE IF NOT EXISTS 
        answers(
             id UUID PRIMARY KEY,
             body TEXT NOT NULL,
             user_id TEXT NOT NULL,
             question_id TEXT NOT NULL,
             created_at TIMESTAMP,
             updated_at TIMESTAMP
        )
`;

const favourateTbText = `
    CREATE TABLE IF NOT EXISTS 
        favourites(
             id UUID PRIMARY KEY, 
             user_id TEXT NOT NULL,
             question_id TEXT NOT NULL,
             created_at TIMESTAMP,
             updated_at TIMESTAMP
        )
`;

const votesTbText = `
    CREATE TABLE IF NOT EXISTS 
        votes(
             id UUID PRIMARY KEY, 
             user_id TEXT NOT NULL,
             question_id TEXT NOT NULL,
             vote_type TEXT NOT NULL,
             created_at TIMESTAMP,
             updated_at TIMESTAMP
        )
`;
//vote type ;_ i.e up vote or down vote

const diseaseTbText = `
    CREATE TABLE IF NOT EXISTS 
        diseases(
             id UUID PRIMARY KEY, 
             title TEXT NOT NULL,
             body TEXT NOT NULL,
             created_at TIMESTAMP,
             updated_at TIMESTAMP
        )
`;

const diseaseHostTbText = `
    CREATE TABLE IF NOT EXISTS 
        disease_host(
             id UUID PRIMARY KEY, 
             host_type_id TEXT NOT NULL,
             host_type TEXT NOT NULL,
             created_at TIMESTAMP,
             updated_at TIMESTAMP
        )
`;

const practiceTbText = `
    CREATE TABLE IF NOT EXISTS 
        practices(
             id UUID PRIMARY KEY, 
             title TEXT NOT NULL,
             body TEXT NOT NULL,
             created_at TIMESTAMP,
             updated_at TIMESTAMP
        )
`;

const practiceTargetTbText = `
    CREATE TABLE IF NOT EXISTS 
        practice_target(
             id UUID PRIMARY KEY, 
             target_type_id TEXT NOT NULL,
             target_type TEXT NOT NULL,
             created_at TIMESTAMP,
             updated_at TIMESTAMP
        )
`;

const animalTbtexxt = `
    CREATE TABLE IF NOT EXISTS 
        animal_types(
             id UUID PRIMARY KEY, 
             name TEXT NOT NULL,
             description TEXT NOT NULL,
             areas_reared TEXT NOT NULL,
             created_at TIMESTAMP,
             updated_at TIMESTAMP
        )
`;

const plantTbtexxt = `
    CREATE TABLE IF NOT EXISTS 
        plant_types(
             id UUID PRIMARY KEY, 
             name TEXT NOT NULL,
             description TEXT NOT NULL,
             areas_planted TEXT NOT NULL,
             created_at TIMESTAMP,
             updated_at TIMESTAMP
        )
`;


/**
 * Create Tables
 */
 const createTables =async () => {
    //get all sql stmts
    const sqlStrings = [usersTbText,];
    
    //iterate through stmts to create tables
    sqlStrings.forEach(stmt=>{
        pool.query(stmt)
        .then((res) => {
            pool.end();
        })
        .catch((err) => {
            pool.end();
        });
    })
    
};

/**
 * Drop Tables
 */
const dropTables = () => {
    const tables = ['users']

    tables.forEach(table=>{
        let queryText = 'DROP TABLE IF EXISTS '+table;
        
        pool.query(queryText)
        .then((res) => {
            pool.end();
        })
        .catch((err) => {
            pool.end();
        });
    })
    
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createTables,
    dropTables
};

require('make-runnable');