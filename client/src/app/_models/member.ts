import { Photo } from "./Photo";

export interface Member{
id: number,
username : string,
photourl : string,
age:number,
knownas:string,
created:Date,
lastactive:Date,
gender:string,
introduction:string,
lookingfor:string,
interests:string,
city:string,
country:string,
photo: Photo[]

}


