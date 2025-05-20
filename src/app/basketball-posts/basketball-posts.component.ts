import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts/posts.services';
import { Post } from '../posts/post.model';  // Import Post from your model

@Component({
  selector: 'app-basketball-posts',
  templateUrl: './basketball-posts.component.html',
  styleUrls: ['./basketball-posts.component.css']
})
export class BasketballPostsComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription | undefined;
  postsPerPage = 10;
  currentPage = 1;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.posts = postData.posts;
      });
  }

  ngOnDestroy() {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }
}
