export interface UserCreationRequest {
    username: string,
    password: string,
    fullName: string,
    emailAddress: string,
    golfCourseId?: string,
}
