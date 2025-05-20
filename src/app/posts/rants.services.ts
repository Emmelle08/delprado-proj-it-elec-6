import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rant } from './rant.model';

@Injectable({
  providedIn: 'root'
})
export class RantsService {
  private apiUrl = 'http://localhost:3000/api/rants'; // adjust your backend API URL

  constructor(private http: HttpClient) {}

  // Get all rants for a post (with replies)
  getRantsForPost(postId: string): Observable<Rant[]> {
    return this.http.get<Rant[]>(`${this.apiUrl}/post/${postId}`);
  }

  // Add a new rant to a post
  addRant(postId: string, content: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/post/${postId}`, { content });
  }

  // Add a reply to a rant
  addRantReply(rantId: string, replyContent: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${rantId}/reply`, { content: replyContent });
  }

  // Get a single rant by its ID (with replies)
  getRantById(rantId: string): Observable<Rant> {
    return this.http.get<Rant>(`${this.apiUrl}/${rantId}`);
  }
}