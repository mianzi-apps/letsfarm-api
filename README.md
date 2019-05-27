# letsfarm-api
this will contain the backend for lets farm application

#set up
1. clone repo
2. create .env in the root directory
3. add the following information
PORT=value
DATABASE_URL=postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
e.g postgres://steve@127.0.0.1:5432/farming_db
4. install all the dependencies
5. create tables by running command `node db/db createTables`


# running the application 
type command `npm start`
it will run on port specified in your .env


