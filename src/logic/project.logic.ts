import { Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from '../database';

const listProjects = async (req: Request, res: Response): Promise<Response> => {

    const queryString: string = `
    SELECT 
        pj."id",
        pj."name",
        pj."description",
        pj."estimatedTime",
        pj."repository",
        pj."starDate",
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

    

    return res
}

export {
    listProjects,
}