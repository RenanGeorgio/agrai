import axios from 'axios';
import https from 'https';

const dotenv = require("dotenv");
dotenv.config({path: "../../local.env"}) 

const SatelliteApi = axios.create({
  baseURL: 'http://api.agromonitoring.com/agro/1.0/',
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
}); 

export default SatelliteApi;