import {Request, Response, NextFunction, text, response} from "express";
import { Query, QueryConfig, QueryResult } from "pg";
import { client } from '../database';
import { requiredPostRequestKeys, requiredPostInfoKeys } from '../@types'

const validateDevId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const id: number = parseInt(req.params.id)

    const queryString: string = `
        SELECT
            *
        FROM   
            developers
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
            message: 'Dev not found'
        })
    }

    return next()
}

const checkPostValues = (req: Request, res: Response, next: NextFunction): Response | void => {

    const keys: Array<string> = Object.keys(req.body)

    const requiredRequestKeys: Array<requiredPostRequestKeys> = ["name", "email"]

    requiredRequestKeys.map((key: any) => {
        if(!keys.includes(key)){
            return res.status(400).json({
                message: `Missing required key: ${key}`
            })
        }
    })

    const name: string = req.body.name
    const email: string = req.body?.email

    if(name === "" || email === ""){
        return res.status(400).json({
            message: "You must pass valid values in the fields"
        })
    }

    if(typeof(name) === "number" || typeof(email) === "number"){
        return res.status(400).json({
            message: "All fields must be string"
        })
    }

    const newBodyReq = {
        name: name,
        email: email

    }

    req.body = newBodyReq

    return next()
}

const checkPostInfoValues = (req: Request, res: Response, next: NextFunction): Response | void => {

    const keys: Array<string> = Object.keys(req.body)

    const developerSince: string = req.body.developerSince
    const preferredOS: string = req.body.preferredOS
    
    const requiredPostInfoKeys: Array<requiredPostInfoKeys> = ["developerSince", "preferredOS"]

    requiredPostInfoKeys.map((key: string) => {
        if(!keys.includes(key)){
            return res.status(400).json({
                message: `Missing required key: ${key}`
            })
        }
    })

    if(developerSince === "" || preferredOS === ""){
        return res.status(400).json({
            message: "You must pass valid values in the fields"
        })
    }

    if(typeof(developerSince) === "number" || typeof(preferredOS) === "number"){
        return res.status(400).json({
            message: "All fields must be string"
        })
    }

    const newBodyReq = {
        developerSince: developerSince,
        preferredOS: preferredOS
    }

    req.body = newBodyReq

    return next()
}

const validateEmail = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const email: string = req.body.email

    const queryString: string = `
        SELECT
            *
        FROM 
            developers
        WHERE
            email = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [email]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    if(queryResult.rowCount){
        return res.status(409).json({
            message: "Email already exists."
        })
    }


    return next()
}

const checkUpdate = (req: Request, res: Response, next: NextFunction): Response | void => {

    
    const keys: Array<string> = Object.keys(req.body)

    const requiredRequestKeys: Array<requiredPostRequestKeys> = ["name", "email"]

    requiredRequestKeys.map((key: any) => {
        if(!keys.includes(key)){
            return res.status(400).json({
                message: `Missing required key: ${key}`
            })
        }
    })

    return next()
}


export { validateDevId, checkPostValues, checkPostInfoValues, validateEmail }

