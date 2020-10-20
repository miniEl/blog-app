import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  submitForm: FormGroup;
  currentPost = null;

  constructor(private posts: PostsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.viewPost(this.route.snapshot.paramMap.get('id'));
    this.submitForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] }),
      content: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.updatePost();
  }

  viewPost(id: any) {
    this.posts.getPost(id).subscribe(data => {
      this.currentPost = data;
      this.submitForm.patchValue({
        title: this.currentPost.title,
        content: this.currentPost.content
      })
    }, error => {
      console.log(error);
    });
  }

  updatePost() {
    this.posts.updatePost(this.currentPost, this.currentPost.id).subscribe(() => {
      console.log('UPDATED');
      this.router.navigate(['/view-post', this.currentPost.id]);
    })
  }
}
