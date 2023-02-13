import express, { Application, json } from "express";
import { databaseInit } from "./database";
import {
    checkPostValues,
    validateDevId,
    validateProjectId,
    checkPostInfoValues,
    validateProjectValues,
    validateTechName,
    validateEmail,
    validateProjectName
} from "./middlewares"
import {
    listAllDevs,
    listDev,
    createDev,
    listDevProjects,
    updateDev
} from './logic'

const app: Application = express();

app.use(express.json())

const PORT: number = Number(process.env.PORT) || 3000 

// developer Rotes
app.get('/developers', listAllDevs) // ✅
app.get('/developers/:id', validateDevId, listDev) // ✅
app.get('/developers/:id/projects', validateDevId, listDevProjects) // --**
app.post('/developers', checkPostValues, validateEmail, createDev) // ✅
app.post('/developers/:id/info', validateDevId, checkPostInfoValues, validateEmail) // ✅
app.patch('/developers/:id', validateDevId, checkPostValues, updateDev)
app.patch('/developers/:id/info', validateDevId, checkPostInfoValues,)
app.delete('/developers/:id', validateDevId,)

// projects Rotes
app.get('/projects')
app.get('/projects/:id', validateProjectId, )
app.post('/projects', validateProjectValues, validateProjectName)
app.post('/projects/:id/technologies', validateProjectId, validateProjectValues, validateProjectName)
app.patch('/projects/:id', validateProjectId, validateProjectValues, validateProjectName)
app.delete('/projects/:id', validateProjectId, )
app.delete('/projects/:id/technologies/:name', validateProjectId, validateTechName)


app.listen(PORT, async ():Promise<void> => {
    await databaseInit()
    console.log(`Server is Running on port: ${PORT}!`)
})
