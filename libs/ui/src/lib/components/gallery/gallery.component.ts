import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: []
})
export class GalleryComponent implements OnInit {
  selectedImageUrl!: File;
  @Input() images!: File[];

  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImageUrl = this.images[0];
    }
  }

  changeSelectedImage(imageUrl: File) {
    this.selectedImageUrl = imageUrl;
  }

  get hasImages() {
    return this.images?.length > 0;
  }

}
