import { CommentService } from './comments.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Comment } from './comment';
import { Text } from './text';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalComponent } from './modal/modal.component';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fake reddit';
  texts: Text[] = [];
  comments: Comment[] = [];
  content: string;
  contentId: 1;

  constructor(private CommentService: CommentService,
              public dialog: MatDialog,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer)
  { 
    iconRegistry.addSvgIcon(
      'delete-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/delete-24px.svg'));
  }

  ngOnInit() { 
    this.getComments();
  }
  
  getComments() {  
    return this.CommentService.getComments().subscribe(comments => {  
      this.comments = comments;
      this.getTexts(this.comments);  
    });
  }

  getTexts(comments: Comment[]) {
    this.texts = [];
    this.texts.push({ Id : 1, Title : "I have this amazing idea",
     Content: "I promise you guys it is really amazing", Comments : comments.filter(x => x.textId == 1) });

    this.texts.push({ Id : 2, Title : "This cooking recipe will blow you mind",
     Content : "Use 2dl of water and thats about it", Comments : comments.filter(x => x.textId == 2) });

     this.texts.push({Id : 3, Title : "How would you guys fix Manchester United?",
     Content : "Really wished they would stop sucking.", Comments : comments.filter(x => x.textId == 3)});
  }

  openDialog(textId: number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: {id: 1, content: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.content = result;
      if(this.content !== undefined){
        this.saveComment(textId, this.content);
      }
    });
  }

  saveComment(textId: number, content: string){
    this.CommentService.addComment(textId, content).subscribe(result => this.getComments());
  }

  deleteComment(commentId: number){
    this.CommentService.deleteComment(commentId).subscribe(result => this.getComments());
  }
}