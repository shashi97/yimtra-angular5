import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'dialog-data-example-dialog',
  template: `<h1 mat-dialog-title>Report Listing</h1>
  <div mat-dialog-content>    
    <mat-form-field  class="example-full-width">
    <textarea maxlength="200" matInput [(ngModel)]="remarks" matTextareaAutosize matAutosizeMinRows="2" placeholder="Leave a comment"></textarea>
  </mat-form-field> 
  </div>
  <div mat-dialog-actions style="float:right">
    <button mat-button [mat-dialog-close]="">Cancel</button>
    <button mat-button [mat-dialog-close]="remarks" cdkFocusInitial>Submit</button>
  </div>`,
  styleUrls: ['./book-unique-home-report.component.css']
})
export class BookUniqueHomeReportListing {
  public dialogRefs: MatDialogRef<BookUniqueHomeReportListing>;
  public remarks:string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog) { }
  onNoClick(): void {
    this.dialogRefs.close();
  }
}