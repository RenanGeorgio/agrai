import axios from 'axios';
import https from 'https';

const dotenv = require("dotenv");
dotenv.config({path: "../../local.env"}) 

const TrackerApi = axios.create({
  baseURL: `https://${process.env.TRACKING_API_URL}`,
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
}); 

export default TrackerApi;