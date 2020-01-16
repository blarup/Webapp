import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
  
import { Comment } from './comment';  
  
const api = 'https://35.197.13.255/comments/v1'
@Injectable()  
export class CommentService {  
  constructor(private http: HttpClient) { }  
  
  getComments() {  
    return this.http.get<Array<Comment>>(`${api}/comments`);  
  }
  
  addComment(textId: number, content: string) {
    return this.http.post(`${api}/comments?textId=${textId}&content=${content}`, {});
  }

  deleteComment(id: number){
      return this.http.delete(`${api}/comments?commentId=${id}`);
  }
     
}  