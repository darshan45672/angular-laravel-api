import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../post-service';
import { Post } from '../post';

@Component({
  selector: 'app-edit',
  imports: [RouterModule, FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class Edit {

  title: string = '';
  content: string = '';
  errors: { title?: string, content?: string } = {};
  postId: string = '';

  constructor( private postService: PostService, private router: Router, private route: ActivatedRoute) {}

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

  submit(){
    if (! this.title || ! this.content) {
      this.errors = {
        title: !this.title ? 'Title is required' : '',
        content: !this.content ? 'Content is required' : ''
      };
      return;
      
    }
    const postData = {
      id: this.postId ? parseInt(this.postId) : 0,
      title: this.title,
      content: this.content
    } as Partial<Post>;

    this.postService.updatePost(this.postId ,postData as Post).subscribe({
      next: (response) => {
        console.log('Post updated successfully:', response);
        // Optionally, you can reset the form or navigate to another page
        this.title = '';
        this.content = '';
        this.errors = {};
      },
      error: (error) => {
        console.error('Error updating post:', error);
        // Handle error appropriately
      }
    });
    alert(`Post updated with Title: ${this.title} and Content: ${this.content}`);
    // alert(`Title: ${this.title}\nContent: ${this.content}`);

    this.router.navigate(['/posts']);
  }

}
