import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../post-service';
import { Post } from '../post';

@Component({
  selector: 'app-create',
  imports: [RouterModule, FormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create {

  title: string = '';
  content: string = '';
  errors: { title?: string, content?: string } = {};

  constructor( private postService: PostService, private router: Router) {}

  submit(){
    if (! this.title || ! this.content) {
      this.errors = {
        title: !this.title ? 'Title is required' : '',
        content: !this.content ? 'Content is required' : ''
      };
      return;
      
    }
    const postData = {
      title: this.title,
      content: this.content
    } as Partial<Post>;

    this.postService.createPost(postData as Post).subscribe({
      next: (response) => {
        console.log('Post created successfully:', response);
        // Optionally, you can reset the form or navigate to another page
        this.title = '';
        this.content = '';
        this.errors = {};
      },
      error: (error) => {
        console.error('Error creating post:', error);
        // Handle error appropriately
      }
    });
    alert(`Post created with Title: ${this.title} and Content: ${this.content}`);
    // alert(`Title: ${this.title}\nContent: ${this.content}`);

    this.router.navigate(['/posts']);
  }

}
