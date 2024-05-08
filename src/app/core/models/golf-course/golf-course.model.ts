import { Post } from "../post/post.model";
import { Score } from "../score/score.model";

export interface GolfCourse {
    id: string,
    name: string,
    city: string,
    subdivision?: string,
    country: string,
    slopeRating: number,
    courseRating: number,
    yardage: number,
    par: number,
    scores: Score[],
    posts: Post[],
}
