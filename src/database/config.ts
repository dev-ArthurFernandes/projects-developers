import "dotenv/config";
import { Client } from "pg";

const client: Client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    port:  Number(process.env.POST)
})


export default client