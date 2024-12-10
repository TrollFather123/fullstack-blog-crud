export interface IRegisterPayloadBody {
    fullName?:string;
    email:string;
    password:string;
    confirmPassword?:string
}
export interface ILoginPayloadBody {
    email:string;
    password:string;
}
export interface IUserData {
    fullName: string;
    email: string;
    password: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface IUserResponse {
    status: number;
    message: string;
    user: IUserData;
    token: string;
  }
  