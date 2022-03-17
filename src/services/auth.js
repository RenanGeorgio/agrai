import axios from 'axios';
import https from 'https';

const dotenv = require("dotenv");
dotenv.config({path: "../../local.env"}) 

const AuthApi = axios.create({
  baseURL: `https://${process.env.TRACKING_SERVER}`,
  withCredentials: true,
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
}); 

export default AuthApi;