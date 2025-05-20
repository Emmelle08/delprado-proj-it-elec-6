import { Component, Input, OnInit } from '@angular/core';
import { Rant } from '../posts/rant.model';
import { RantsService } from '../posts/rants.services';

@Component({
  selector: 'app-basketball-rant',
  templateUrl: './basketball-rant.component.html',
  styleUrls: ['./basketball-rant.component.css']
})
export class BasketballRantComponent implements OnInit {
  @Input() postId!: string;

  rants: Rant[] = [];
  newReplyContent: { [rantId: string]: string } = {};

  constructor(private rantsService: RantsService) {}

  ngOnInit(): void {
    this.loadRants();
  }

  loadRants(): void {
    this.rantsService.getRantsForPost(this.postId).subscribe((rants: Rant[]) => {
      this.rants = rants;
    });
  }

  addReply(rantId: string): void {
    const replyText = this.newReplyContent[rantId];
    if (!replyText || !replyText.trim()) return;

    this.rantsService.addRantReply(rantId, replyText).subscribe(() => {
      this.newReplyContent[rantId] = '';
      this.loadRants();
    });
  }
}