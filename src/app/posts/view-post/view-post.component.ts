import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
  currentPost = null;

  constructor(private posts: PostsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.viewPost(this.route.snapshot.paramMap.get('id'));
  }

  viewPost(id: any) {
    this.posts.getPost(id).subscribe(data => {
      this.currentPost = data;
    }, error => {
      console.log(error);
    });
  }

  deletePost() {
    this.posts.deletePost(this.currentPost.id).subscribe(() => {
      this.router.navigate(['/posts']);
      console.log('DELETED');
    });
  }
}
