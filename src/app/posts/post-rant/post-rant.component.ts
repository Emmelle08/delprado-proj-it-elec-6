import { Component, Input, OnInit } from '@angular/core';
import { RantsService } from '../rants.services';

@Component({
  selector: 'app-post-rant',
  templateUrl: './post-rant.component.html',
  styleUrls: ['./post-rant.component.css']
})
export class PostRantComponent implements OnInit {
  @Input() postId!: string;

  newRantContent: string = '';

  constructor(private rantsService: RantsService) {}

  ngOnInit(): void {}

  addRant(): void {
    if (!this.newRantContent.trim()) return;

    this.rantsService.addRant(this.postId, this.newRantContent).subscribe(() => {
      this.newRantContent = '';
      // Optionally emit an event to reload rants from parent
    });
  }
}