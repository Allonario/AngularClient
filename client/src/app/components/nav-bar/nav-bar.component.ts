import { Component } from '@angular/core';
import {IdService} from "../../services/id.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  userId: number = 0

  constructor(private idService: IdService) {}

  ngOnInit() {
    this.idService.currentId.subscribe(id => {
      this.userId = id;
    });
  }
}
