import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../post-service';

@Component({
  selector: 'app-show',
  imports: [RouterModule],
  templateUrl: './show.html',
  styleUrl: './show.css'
})
export class Show {

  title: string = '';
  content: string = '';
  errors: { title?: string, content?: string } = {};
  postId: string = '';

  constructor( private postService: PostService,  private route: ActivatedRoute) {}

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('postId')!; 
    // console.log(this.postId);
    
    this.postService.getPostById(this.postId).subscribe({
      next: (post) => {
        this.title = post.title;
        this.content = post.content;
      },
      error: (error) => {
        console.error('Error fetching post:', error);
      }
    });
  } 
}
