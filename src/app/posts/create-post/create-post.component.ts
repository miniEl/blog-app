import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  submitForm: FormGroup;
  currentPost = {
    id: '',
    title: '',
    content: '',
    published: false
  };

  constructor(private posts: PostsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] }),
      content: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.createPost();
  }

  createPost() {
    const data = {
      id: this.currentPost.id,
      title: this.currentPost.title,
      content: this.currentPost.content
    };

    this.posts.createPost(data)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/view-post', response.id]);
          // this.submitForm.patchValue({
          //   title: response.title,
          //   content: response.content
          // })
        },
        error => {
          console.log(error);
        });
  }

  newPost() {
    this.currentPost = {
      id: '',
      title: '',
      content: '',
      published: false
    };
  }
}
