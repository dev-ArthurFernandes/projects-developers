import express, { Application, json } from "express";
import { databaseInit } from "./database";
import {
    checkPostKeys,
    validateDevId,
    validateProjectId,
    checkPostInfoKeys,
    validateProjectValues,
    validateTechName,
    validateEmail,
    validateProjectName,
    checkUpdate,
    checkValues,
} from "./middlewares"
import {
    listAllDevs,
    listDev,
    createDev,
    listDevProjects,
    updateDev,
    setDevInfo,
    updateDevInfo,
    deleteDev,
    listAllProjects,
    listProject,
    createProject
} from './logic'

const app: Application = express();

app.use(express.json())

const PORT: number = Number(process.env.PORT) || 3000 

// developer Rotes
app.get('/developers', listAllDevs) // ✅
app.get('/developers/:id', validateDevId, listDev) // ✅
app.get('/developers/:id/projects', validateDevId, listDevProjects) // --**
app.post('/developers', checkPostKeys, checkValues,validateEmail, createDev) // ✅
app.post('/developers/:id/info', validateDevId, checkPostInfoKeys, checkValues, setDevInfo) // ✅
app.patch('/developers/:id', validateDevId, checkValues, checkUpdate, updateDev) // ✅
app.patch('/developers/:id/info', validateDevId, checkPostInfoKeys, checkValues, updateDevInfo) // ✅
app.delete('/developers/:id', validateDevId, deleteDev) // ✅/❌ (Tem que deletar a informação adicional do devsenvolvedor)

// projects Rotes
app.get('/projects', listAllProjects) // ✅
app.get('/projects/:id', validateProjectId, listProject) // ✅
app.post('/projects', validateProjectValues, validateProjectName, createProject)
app.post('/projects/:id/technologies', validateProjectId, validateProjectValues, validateProjectName)
app.patch('/projects/:id', validateProjectId, validateProjectValues, validateProjectName)
app.delete('/projects/:id', validateProjectId, )
app.delete('/projects/:id/technologies/:name', validateProjectId, validateTechName)


app.listen(PORT, async ():Promise<void> => {
    await databaseInit()
    console.log(`Server is Running on port: ${PORT}!`)
})
