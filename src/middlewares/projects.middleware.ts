import {Request, Response, NextFuction} from "express";

const validateProjectId = (req: Request, res: Response, next: NextFuction): Response | void => {

    const id: number = parseInt(req.params.id)

    const queryString: string = `
        SELECT
            *
        FROM   
            projects
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
            message: 'Project not found'
        })
    }

    return next()
}