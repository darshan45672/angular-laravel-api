import { Component } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post-service';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class Index {

  posts: Post[] = [];

  constructor( private postService: PostService ) {}

  ngOnInit():void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        console.log('Posts fetched successfully:', this.posts);
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });

  }
}
