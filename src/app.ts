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
    validateProdTechValues,
    checkOSValues,
    validateProjectDevId
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
    createProject,
    setProjectTechnology,
    updateProject,
    deleteProject,
    deleteTech
} from './logic'

const app: Application = express();

app.use(json())

const PORT: number = Number(process.env.PORT) || 3000 

// developer Rotes
app.get('/developers', listAllDevs) // ✅
app.get('/developers/:id', validateDevId, listDev) // ✅
app.get('/developers/:id/projects', validateDevId, listDevProjects) // ✅
app.post('/developers', checkPostKeys, checkValues,validateEmail, createDev) // ✅
app.post('/developers/:id/info', validateDevId, checkPostInfoKeys, checkOSValues, setDevInfo) // ✅
app.patch('/developers/:id', validateDevId, checkValues, checkUpdate, updateDev) // ✅
app.patch('/developers/:id/info', validateDevId, checkPostInfoKeys, checkValues, updateDevInfo) // ✅
app.delete('/developers/:id', validateDevId, deleteDev) // ✅

// projects Rotes
app.get('/projects', listAllProjects) // ✅
app.get('/projects/:id', validateProjectId, listProject) // ✅
app.post('/projects', validateProjectName, validateProjectDevId, createProject) // ✅
app.post('/projects/:id/technologies', validateProjectId, validateProdTechValues, setProjectTechnology) // ✅
app.patch('/projects/:id', validateProjectId, validateProjectValues, validateProjectName, updateProject, updateProject) // ✅
app.delete('/projects/:id', validateProjectId, deleteProject) // ✅
app.delete('/projects/:id/technologies/:name', validateProjectId, validateTechName, deleteTech) // ✅

app.listen(PORT, async (): Promise<void> => {
    await databaseInit()
    console.log(`Server is Running on port: ${PORT}!`)
})
