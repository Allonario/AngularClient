import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private link: string = '';

  setLink(newLink: string) {
    this.link = newLink;
  }

  getLink() {
    return this.link;
  }
}
