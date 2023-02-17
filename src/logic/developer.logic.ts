import { NextFunction, query, Request, Response } from "express";
import { Query, QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";

const createDev = async (req:Request, res: Response): Promise<Response> => {

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

    const id: number = parseInt(req.params.id)

    const queryString: string = format(`
        UPDATE
            developers dev
        SET(%I) = ROW(%L)
        WHERE
            dev.id = $1
        RETURNING 
            dev."id",
            dev."name",
            dev."email";
    `,
        Object.keys(req.body),
        Object.values(req.body)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult = await client.query(queryConfig)

    return res.status(201).json(queryResult.rows[0])
}

const listAllDevs = async (req:Request, res: Response): Promise<Response> => {
    
    const queryString: string = `
        SELECT 
            dev."id",
            dev."name",
            dev."email",
            di."developerSince",
            di."preferredOS"
        FROM
            developers dev
        LEFT JOIN
            developer_info di ON di.id = dev."aditionalInfoId";
    `

    const queryResult: QueryResult = await client.query(queryString)
    
    return res.status(200).json(queryResult.rows)

}

const listDev = async (req: Request, res: Response): Promise<Response> => {
    
    const id: string = req.params.id

    const queryString: string = `
        SELECT 
            dev."id",
            dev."name",
            dev."email",
            di."developerSince",
            di."preferredOS"
        FROM
            developers dev
        FULL JOIN
            developer_info di ON di.id = dev."aditionalInfoId"
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

const setDevInfo = async (req: Request, res: Response): Promise<Response | void> => {

    const id: number = parseInt(req.params.id)

    let queryString: string = format(`
        INSERT INTO
            developer_info(%I)
        VALUES(%L)
        RETURNING *;
    `,
        Object.keys(req.body),
        Object.values(req.body)
    )

    let queryResult: QueryResult = await client.query(queryString)

    const devInfoId = queryResult.rows[0].id

    queryString = `
        UPDATE
            developers 
        SET("aditionalInfoId") = ROW($1)
        WHERE
            developers.id = $2;
    `

    let queryConfig: QueryConfig = {
        text: queryString,
        values: [devInfoId, id]
    }

    await client.query(queryConfig)

    queryString = `
        SELECT 
            dev."id",
            dev."name",
            dev."email",
            di."developerSince",
            di."preferredOS"
        FROM
            developers dev
        FULL JOIN
            developer_info di ON di.id = dev."aditionalInfoId"
        WHERE
            dev.id = $1;
    `

    queryConfig = {
        text: queryString,
        values: [id]
    }

    queryResult = await client.query(queryConfig)

    return res.status(201).json(queryResult.rows[0])
}

const updateDevInfo = async (req: Request, res: Response): Promise<Response | void> => {

    const id: number = parseInt(req.params.id)

    let queryString = `
        SELECT
            dev."aditionalInfoId"
        FROM
            developers dev
        WHERE
            dev.id = $1;
    `

    let queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    let queryResult = await client.query(queryConfig)

    const infoId = queryResult.rows[0].aditionalInfoId

    console.log(infoId)

    queryString = format(`
        UPDATE
            developer_info devI
        SET(%I) = ROW(%L)
        WHERE
            devI.id = $1;
    `,
        Object.keys(req.body),
        Object.values(req.body)
    )

    queryConfig = {
        text: queryString,
        values: [infoId]
    }

    await client.query(queryConfig)

    queryString = `
        SELECT 
            dev."id",
            dev."name",
            dev."email",
            di."developerSince",
            di."preferredOS"
        FROM
            developers dev
        FULL JOIN
            developer_info di ON di.id = dev."aditionalInfoId"
        WHERE
            dev.id = $1;
    `
    queryConfig = {
        text: queryString,
        values: [id]
    }

    queryResult = await client.query(queryConfig)

    return res.status(200).json(queryResult.rows[0])
}

const deleteDev = async (req: Request, res: Response): Promise<Response> => {

    const id: number = parseInt(req.params.id)

    const queryString = `
        DELETE FROM
            developers dev
        WHERE
            dev.id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    await client.query(queryConfig)

    return res.status(204).json()
}

export {
    createDev,
    updateDev,
    listAllDevs,
    listDev,
    listDevProjects,
    setDevInfo,
    updateDevInfo,
    deleteDev
}