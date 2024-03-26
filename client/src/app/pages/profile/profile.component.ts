import {Component, OnInit} from '@angular/core';
import {IUser} from "../../models/user.model";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {IdService} from "../../services/id.service";
import {LinkService} from "../../services/link.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  user: IUser | undefined;
  userId: number = 0;
  isLoading: boolean = true;
  imageUrl: string = '';
  isAdmin: boolean = false;

  constructor(private linkService: LinkService, private userService: UserService,
              private route: ActivatedRoute, private idService: IdService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.userService.getUser(this.userId).subscribe(user => {
        this.user = user;
        this.imageUrl = this.user.photo ? `assets${this.user.photo}` : "assets/img/logo.png";
        this.isLoading = false;
        this.isAdmin = this.user.role == "admin";
        this.idService.updateId(this.userId);
        this.linkService.setLink(this.imageUrl);
      });
    });
  }
}
