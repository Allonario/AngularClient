import {INews} from "./news.model";

export interface IUser {
  name: string;
  email: string;
  friends: number[];
  birthDate: string;
  role: string;
  status: string;
  news: INews[];
  photo: string;
}
