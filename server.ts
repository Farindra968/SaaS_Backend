import app from './src/app'
import envConfig from './src/config/config';
// Importing the Database connection
import './src/config/dbConnection'

// Importing the express app and environment configuration
// Starting the server
const server = ()=> {
    const port = envConfig.portNumber; // Port number define from config file
    app.listen(port, ()=>{
        console.log(`Server is running on http://localhost:${port}`);
    })
}

server();
