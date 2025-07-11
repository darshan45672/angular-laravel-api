import { Component } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [RouterModule],
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
        console.log('Posts fetched successfully:');
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  deletePost(id: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts = this.posts.filter(post => post.id !== Number(id));
          console.log('Post deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting post:', error);
        }
      });
    }
  }
}
function deletePost(id: any, string: any) {
  throw new Error('Function not implemented.');
}

