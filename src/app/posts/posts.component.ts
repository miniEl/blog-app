import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public postList: { id: number, title: string, content: string }[];
  currentPost = null;
  currentIndex = -1;

  constructor(private posts: PostsService, private router: Router) { }

  ngOnInit(): void {
    this.posts.getList().subscribe(data => {
      this.postList = data;
    }, error => {
      console.log(error);
    });
  }

  deletePost(id: number) {
    this.posts.deletePost(id).subscribe(() => {
      this.postList = this.postList.filter(item => item.id != id);
      console.log('DELETED');
    });
  }
}
