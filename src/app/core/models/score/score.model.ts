export interface Score {
    id: string,
    total: number,
    differential: number,
    createdDate: Date,
    userId: string,
    golfCourseId?: string,
    golfCourseName?: string,
    userName: string,
}
