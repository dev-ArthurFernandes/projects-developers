import client from './config'

const databaseInit = async (): Promise<void> => {
    await client.connect()
    console.log("Database connecting!")
} 

export default databaseInit