import { Request, Response } from "express"
import { QueryConfig, QueryResult } from "pg"
import format from "pg-format"
import { client } from '../database'

const createDev = async (req:Request, res: Response): Promise<Response> => {
    
    console.log(req.body)

    const request = {
        ...req.body,
        aditionalInfoId: null
    } 

    console.log(request)

    const queryString: string = format(`
        INSERT INTO
            developers(%I)
        VALUES
            (%L)
        RETURNING *;
    `,
        Object.keys(request),
        Object.values(request)
    )

    const queryResult: QueryResult = await client.query(queryString)

    return res.status(201).json(queryResult.rows[0])
}

const updateDev = async (req:Request, res: Response): Promise<Response> => {
    
    const queryString: string = format(`
        INSERT INTO
            developers(%I)
        VALUES(%L);
    `,
        Object.keys(req.body),
        Object.values(req.body)
    )

    const queryResult: QueryResult = await client.query(queryString)

    return res.status(201).json(queryResult.rows[0])
}

const listAllDevs = async (req:Request, res: Response): Promise<Response> => {
    
    const queryString: string = `
        SELECT
            *
        FROM
            developers as dev
        FULL JOIN
            developer_info devI ON devI.id = dev."aditionalInfoId";
    `

    const queryResult: QueryResult = await client.query(queryString)
    
    return res.status(200).json(queryResult.rows[0])

}

const listDev = async (req: Request, res: Response): Promise<Response> => {
    
    const id: string = req.params.id

    const queryString: string = `
        SELECT
            *
        FROM
            developers dev
        FULL JOIN
            developer_info devI ON devI.id = dev."aditionalInfoId"
        WHERE
            dev.id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    return res.status(200).json(queryResult.rows[0])
}

const listDevProjects = async (req: Request, res: Response): Promise<Response> => {
    
    const id: string = req.params.id
    
    const queryString: string = `
    SELECT
        *
    FROM
        projects pj
    RIGHT JOIN
        projects_technologies pt ON pt."projectId" = pj.id
    JOIN
        technologies tl ON tl.id = pt."technologyId"
    WHERE
        pj.id = $1;
`

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    return res.status(200).json(queryResult.rows[0])
}

export {
    createDev,
    updateDev,
    listAllDevs,
    listDev,
    listDevProjects,
}