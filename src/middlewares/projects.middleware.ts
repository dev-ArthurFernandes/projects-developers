import {Request, Response, NextFunction} from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { requiredProdTechKeys, requiredProjectsKeys, requiredValues } from '../@types';

const validateProjectId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const id: number = parseInt(req.params.id)

    const queryString: string = `
        SELECT
            *
        FROM   
            projects
        WHERE   
            id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult = await client.query(queryConfig)

    if(!queryResult.rowCount){
        return res.status(404).json({
            message: 'Project not found'
        })
    }

    return next()
}

const validateProjectValues = (req: Request, res: Response, next: NextFunction): Response | void => {

    const requestBoydArray = Object.entries(req.body)

    const requiredProjectsKeys: Array<any> = ["name", "description", "repository", "startDate", "estimatedTime"]

    let newRequestBodyArray: Array<any> = []

    requestBoydArray.map((item) => {

        const key: string = item[0]

        if(requiredProjectsKeys.includes(key)){
            newRequestBodyArray.push(item)
        }
    })

    req.body = Object.fromEntries(newRequestBodyArray)

    return next()
}

const validateTechName = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const name: string = req.params.name

    const queryString: string = `
        SELECT
            *
        FROM
            technologies
        WHERE   
            name = $1;
    `

    const queryConfig: QueryConfig ={ 
        text: queryString,
        values: [name]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    if(!queryResult.rowCount){
        return res.status(404).json({
            message: "Technology not found!"
        })
    }

    return next()
}

const validateProjectName = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const name: string = req.body.name

    const queryString: string = `
        SELECT
            *
        FROM
            projects
        WHERE
            name = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [name]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    if(queryResult.rowCount){
        return res.status(409).json({
            message: "Projecy already exists."
        })
    }


    return next()
}

const validateProdTechValues = (req: Request, res: Response, next: NextFunction): Response | void => {

    const requestBoydArray = Object.keys(req.body)

    const requiredProdTechKeys: Array<requiredProdTechKeys> = ["addedIn", "projectId", "technologyId"]

    const validateRequest = requiredProdTechKeys.every((key) => {
        return requestBoydArray.includes(key)
    })

    if(!validateRequest){
        return res.status(400).json({
            message: `These are required keys: ${requiredProdTechKeys}`
        })
    }

    req.body = {
        addedIn: req.body.addedIn,
        projectId: req.body.projectId,
        technologyId: req.body.technologyId
    }

    return next()
}

const validateProjectDevId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const id: number = parseInt(req.body.developerId)

    const querySting: string = `
        SELECT
            *
        FROM
            developers;
    `

    const queryConfig: QueryConfig = {
        text: querySting,
        values: [id]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    if(!queryResult.rowCount){
        return res.status(404).json({
            message: "Dev not found!"
        })
    }

    return next()
}

export {
    validateProjectId,
    validateProjectValues,
    validateTechName,
    validateProjectName,
    validateProdTechValues,
    validateProjectDevId
}