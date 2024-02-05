import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

interface Post {
  id?: number;
  title: string;
}

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  error: any = null;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe((response: any) => {
        this.posts = response as Post[];
      },error => this.error = error);

 
  }
  

  createPost(input: HTMLInputElement) {
    const post: Post = { title: input.value };
    input.value = '';
  
    this.postService.createPost(post)
      .subscribe((response: { id?: number }) => {
        if (response.id !== undefined) {
          post.id = response.id;
          this.posts.splice(0, 0, post);
        } else {
          console.error("Invalid response format:", response);
          // Hata durumunda gerekli işlemleri yapabilirsiniz.
        }
      });
  }
  
  

  updatePost(post: Post) {
    post.title = 'updated';
    this.postService.updatePost(post)
      .subscribe(response => {
        console.log(response);
      });
  }

  deletePost(post: Post) {
    this.postService.deletePost(post)
      .subscribe(response => {
        console.log(response);
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      }, (error: Error) => console.log(error));
  }
}
