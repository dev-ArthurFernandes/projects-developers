import {Request, Response, NextFunction, query} from "express";
import { Query, QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { requiredProjectsKeys } from '../@types';

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

    const keys: Array<string> = Object.keys(req.body)
    const values: Array<string> = Object.values(req.body)
    
    const requiredPostInfoKeys: Array<requiredProjectsKeys> = ["name", "description", "estimatedTime", "repository", "startDate", "endDate"]

    requiredPostInfoKeys.map((key: string) => {
        if(!keys.includes(key)){
            return res.status(400).json({
                message: `Missing required key: ${key}`
            })
        }
    })

    values.map((value: string) => {
        if(value === ""){
            return res.status(400).json({
                message: "You must pass valid values in the fields"
            })
        }
    })


    const newBodyReq = {
        name: req.body.name,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        repository: req.body.repository,
        startDate: req.body.startDate,
        endDate: req.body.endDate ? req.body.endDate : null
    }

    req.body = newBodyReq

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

export { validateProjectId, validateProjectValues, validateTechName, validateProjectName }