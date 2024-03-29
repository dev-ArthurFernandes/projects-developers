import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from '../database';

const listAllProjects = async (req: Request, res: Response): Promise<Response> => {

    const queryString: string = `
        SELECT
            pj."id",
            pj."name",
            pj."description",
            pj."estimatedTime",
            pj."repository",
            pj."startDate",
            Tech."name" AS technology,
            dev."id" AS Developer_Id,
            dev."name" AS Developer,
            dev."email",
            devI."developerSince",
            devI."preferredOS"
        FROM
            PROJECTS_TECHNOLOGIES pjTech
        RIGHT JOIN
            projects pj ON pj.id = pjTech."projectId"
        LEFT JOIN
            technologies Tech ON Tech.id = pjTech."technologyId"
        LEFT JOIN
            developers dev ON dev.id = pj."developerId"
        LEFT JOIN
            developer_info devI ON devI.id = dev."aditionalInfoId";
    `

    const queryResult: QueryResult = await client.query(queryString)

    return res.status(200).json(queryResult.rows)
}

const listProject = async (req: Request, res: Response): Promise<Response> => {
    
    const id: number = parseInt(req.params.id)

    const queryString: string = `
        SELECT
            pj."id",
            pj."name",
            pj."description",
            pj."estimatedTime",
            pj."repository",
            pj."startDate",
            Tech."name" AS technology,
            dev."id" AS Developer_Id,
            dev."name" AS Developer,
            dev."email",
            devI."developerSince",
            devI."preferredOS"
        FROM
            PROJECTS_TECHNOLOGIES pjTech
        RIGHT JOIN
            projects pj ON pj.id = pjTech."projectId"
        LEFT JOIN
            technologies Tech ON Tech.id = pjTech."technologyId"
        LEFT JOIN
            developers dev ON dev.id = pj."developerId"
        LEFT JOIN
            developer_info devI ON devI.id = dev."aditionalInfoId"
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

const createProject = async (req: Request, res: Response): Promise<Response> => {

    const queryString: string = format(`
        INSERT INTO
            projects(%I)
        VALUES(%L)
        RETURNING *;
    `,
        Object.keys(req.body),
        Object.values(req.body)
    )

    const queryResult: QueryResult = await client.query(queryString)

    return res.status(201).json(queryResult.rows[0])
}

const setProjectTechnology = async (req: Request, res: Response): Promise<Response> => {

    const id: number = parseInt(req.params.id)

    const queryString: string = format(`
        INSERT INTO
            projects_technologies(%I)
        VALUES(%L)
        RETURNING *;
    `,
        Object.keys(req.body),
        Object.values(req.body)
    )

    const queryResult: QueryResult = await client.query(queryString)

    return res.status(201).json(queryResult.rows[0])
}

const updateProject = async (req: Request, res: Response): Promise<Response> => {

    const id: number = parseInt(req.params.id)

    const querySting: string = format(`
        UPDATE
            projects pj
        SET(%I) = ROW(%L)
        RETURNING *;
    `,
        Object.keys(req.body),
        Object.values(req.body)
    )

    const queryResult: QueryResult = await client.query(querySting)

    return res.status(200).json(queryResult.rows[0])
}

const deleteProject = async (req: Request, res: Response): Promise<Response> => {

    const id: number = parseInt(req.params.id)

    const queryString: string = `
        DELETE FROM  
            projects pj
        WHERE
            pj.id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    await client.query(queryConfig)

    return res.status(204).json()
}

const deleteTech = async (req: Request, res: Response): Promise<Response> => {

    const id: number = parseInt(req.params.id)

    const name: string = req.params.name

    const querySting: string = `
        DELETE FROM
            projects_technologies pt
        WHERE
            pt."projectId" = $1;
    `

    const queryConfig: QueryConfig = {
        text: querySting,
        values: [id]
    }

    await client.query(queryConfig)

    return res.status(204)
}

export {
    listAllProjects,
    listProject,
    createProject,
    setProjectTechnology,
    updateProject,
    deleteProject,
    deleteTech
}