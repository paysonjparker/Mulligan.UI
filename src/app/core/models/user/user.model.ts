import { Post } from "../post/post.model";
import { Score } from "../score/score.model";

export interface User {
    id: string,
    username: string,
    password: string,
    fullName: string,
    emailAddress: string,
    handicapIndex: number,
    homeCourseName?: string,
    scores: Score[],
    posts: Post[],
    golfCourseId?: string,
}
