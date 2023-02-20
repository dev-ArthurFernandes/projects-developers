interface createProjectRequest {
    name: string,
    description: string,
    estimatedTime: string,
    repository: string,
    startDate: Date,
    endDate: Date | null,
    developerId: number
}

interface technologiesProjectRequest {
    addedIn: Date,
    projectId: number,
    technologyId: number
}