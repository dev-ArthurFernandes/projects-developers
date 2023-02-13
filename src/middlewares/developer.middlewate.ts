import {Request, Response, NextFunction} from "express";
import { client } from '../database';

const validateDevId = (req: Request, res: Response, next: NextFunction): Response | void => {

    const id: number = parseInt(req.params.id)

    const queryString: string = `
        SELECT
            *
        FROM   
            developers
        WHERE   
            id = $1;
    `

    const queryConfig: queryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult = client.query(queryConfig)

    if(!queryResult.rowCount){
        return res.status(404).json({
            message: 'Dev not found'
        })
    }

    return next()
}