import { Component } from '@angular/core';
import {IdService} from "../../services/id.service";
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../models/user.model";
import {ProfilesService} from "../../services/profiles.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
  users: IUser[] = [];
  friendsId: number[] = [];
  userId: number = 0
  searchingName: string = ''

  constructor(private idService: IdService, private route: ActivatedRoute,
              private profilesService: ProfilesService, private http: HttpClient) {}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.idService.updateId(this.userId);
      this.profilesService.getUsers().subscribe(users => {
        this.users = users;
        console.log(this.users)
        this.friendsId = users[this.userId - 1].friends;
        console.log(this.friendsId)
        this.idService.updateId(this.userId);
      });
    });
  }

  getFilteredUsers(): number[] | undefined {
    if(!this.users){
      return undefined;
    }
    if (this.searchingName === '') {
        return this.friendsId.map(key => key-1);
    }

    return this.users
      .map((user, index) => ({ index, name: user.name.toLowerCase() }))
      .filter(({ name, index }) =>
        name.includes(this.searchingName.toLowerCase()) &&
        this.users[this.userId-1].name.toLowerCase() !== name
      )
      .map(({ index }) => index);
  }

  addFriend(userId: number): void{
    this.users[this.userId - 1].friends.push(userId)
    console.log(this.users[this.userId - 1]);
    this.http.put('https://localhost:3000/api/profile/' + `${this.userId}`, {friends: this.friendsId})
      .subscribe(() => {
      console.log('OK')
    });
  }

  deleteFriend(userId: number): void {
    this.users[this.userId - 1].friends.splice(this.friendsId.indexOf(userId), 1)
    console.log(this.users[this.userId - 1]);
    this.http.put('https://localhost:3000/api/profile/' + `${this.userId}`, {friends: this.friendsId})
      .subscribe(() => {
        console.log('OK')
      });
  }
}
