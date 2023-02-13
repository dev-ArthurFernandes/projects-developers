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

app.get('/developers')
app.get('/developers/:id')
app.get('/developers/:id/projects')
app.post('/developers')
app.post('/developers/:id/info')
app.patch('/developers/:id')
app.patch('/developers/:id/info')
app.delete('/developers/:id')

app.get('/projects')
app.get('/projects/:id')
app.post('/projects')
app.post('/projects/:id/technologies')
app.patch('/projects/:id')
app.delete('/projects/:id')
app.delete('/projects/:id/:name')


app.listen(PORT, async ():Promise<void> => {
    await databaseInit()
    console.log("Server is Running!")
})
