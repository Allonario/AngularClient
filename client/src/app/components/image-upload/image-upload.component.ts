import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IdService} from "../../services/id.service";
import {LinkService} from "../../services/link.service";


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})

export class ImageUploadComponent {
  selectedFile: File | undefined;
  userId: number = 0;
  imgLink: string = '';

  constructor(private http: HttpClient, private idService: IdService,
              private linkService: LinkService) {}

  ngOnInit(): void {
    this.idService.currentId.subscribe(id => {
      this.userId = id;
      this.getLink();
    });
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {
      this.selectedFile = files[0];
    } else {
      this.selectedFile = undefined;
    }

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.http.put(`https://localhost:3000/api/profile_list/image/${this.userId}`, formData)
        .subscribe(() => {
          this.imgLink += `?v=${Date.now()}`
      });
    }
  }

  getLink() {
    this.imgLink = this.linkService.getLink();
  }
}

