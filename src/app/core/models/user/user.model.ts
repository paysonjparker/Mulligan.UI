import { Post } from "../post/post.model";
import { Score } from "../score/score.model";

export interface User {
    id: string,
    username: string, 
    password: string,
    name: string, 
    email: string,
    handicapIndex: number,
    scores: Score[],
    posts: Post[],
    golfCourseId: string,
}
