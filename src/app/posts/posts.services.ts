import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "./post.model";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<{ posts: Post[], postCount: number }>();

    constructor(private http: HttpClient) {}

    getPosts(pagesize: number, currentpage: number) {
        const queryParams = `?pagesize=${pagesize}&currentpage=${currentpage}`;
        this.http.get<{ message: string; posts: any; maxPosts: number }>('http://localhost:3000/api/posts' + queryParams)
            .pipe(
                map(postData => {
                    return {
                        posts: postData.posts.map((post: any) => {
                            return {
                                title: post.title,
                                content: post.content,
                                id: post._id,
                                imagePath: post.imagePath,
                                creator: post.creator || post.Creator || undefined
                            };
                        }),
                        maxPosts: postData.maxPosts
                    };
                })
            )
            .subscribe((transformedPostsData) => {
                this.posts = transformedPostsData.posts;
                this.postsUpdated.next({
                    posts: [...this.posts],
                    postCount: transformedPostsData.maxPosts
                });
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    getPost(id: string): Observable<Post> {
        return this.http.get<Post>(`http://localhost:3000/api/posts/${id}`)
            .pipe(catchError(error => {
                console.error("Error fetching post:", error);
                return throwError(() => error);
            }));
    }

    addPost(title: string, content: string, image: File) {
        const postData = new FormData();
        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image, image.name);

        this.http.post<{ message: string; post: Post }>('http://localhost:3000/api/posts', postData)
            .subscribe((responseData) => {
                const newPost: Post = {
                    id: responseData.post.id,
                    title: title,
                    content: content,
                    imagePath: responseData.post.imagePath,
                    creator: responseData.post.creator || undefined
                };
                this.posts.push(newPost);
                this.postsUpdated.next({
                    posts: [...this.posts],
                    postCount: this.posts.length
                });
            }, (error) => {
                console.error("Error creating post:", error);
            });
    }

    updatePost(id: string, title: string, content: string, image?: File | string) {
        let postData: FormData | Post;

        if (typeof image === "object") {
            postData = new FormData();
            postData.append("id", id);
            postData.append("title", title);
            postData.append("content", content);
            postData.append("image", image, image.name);
        } else {
            postData = { id, title, content, imagePath: image || '', creator: undefined };
        }

        this.http.put(`http://localhost:3000/api/posts/${id}`, postData)
            .subscribe(response => {
                const updatedPosts = [...this.posts];
                const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
                updatedPosts[oldPostIndex] = {
                    ...updatedPosts[oldPostIndex],
                    title,
                    content,
                    imagePath: (response as any).imagePath || (typeof image === "string" ? image : updatedPosts[oldPostIndex].imagePath)
                };

                this.posts = updatedPosts;
                this.postsUpdated.next({
                    posts: [...this.posts],
                    postCount: this.posts.length
                });
            }, (error) => {
                console.error("Error updating post:", error);
            });
    }

    deletePost(postId: string): Observable<any> {
        return this.http.delete(`http://localhost:3000/api/posts/${postId}`);
    }
}