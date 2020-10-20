import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  listUrl = "http://localhost:3000/posts";

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get<any[]>(this.listUrl);
  }

  getPost(id: any) {
    const url = `${this.listUrl}/${id}`;
    return this.http.get(url);
  }

  createPost(item: any) {
    return this.http.post<any>(this.listUrl, item);
  }

  updatePost(item: any, id: number) {
    const url = `${this.listUrl}/${id}`;
    return this.http.put(url, item);
  }

  deletePost(id: number) {
    const url = `${this.listUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
