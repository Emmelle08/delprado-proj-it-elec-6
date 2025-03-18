import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.services';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub!: Subscription;
  editedPostId: string | null = null;
  editablePost: { title: string; content: string } = { title: '', content: '' };

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onEdit(post: Post): void {
    this.editedPostId = post.id;
    this.editablePost = { title: post.title, content: post.content };
  }

  onSaveEdit(postId: string): void {
    if (!this.editablePost.title || !this.editablePost.content) return;

    this.postsService.updatePost(postId, this.editablePost.title, this.editablePost.content);
    this.editedPostId = null;
  }

  onDelete(postId: string): void {
    this.postsService.deletePost(postId);
  }
  ngOnDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe(); 
    }
  }
}
