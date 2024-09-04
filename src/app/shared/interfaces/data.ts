export interface registerData extends LogInData,EmailData{
  "name": string,
  "rePassword":string,
  "phone":string
}
export interface LogInData extends EmailData{
  "password":string,
}
export interface EmailData{
  "email":string
}
export interface code{
  "resetCode":string
}
export interface newPassword extends EmailData{
  "newPassword":string
}
export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}
// export interface registerDataSuccess {
//   message: string;
//   user: User;
//   token: string;
// }

//  interface User {
//   name: string;
//   email: string;
//   role: string;
// }
// export interface registerDataField {
//   statusMsg: string;
//   message: string;
// }

// //ممكن تتسبب في مشكله بعد كدا
// export interface userdata{
//   "id": string,
//   "name": string,
//   "role": string,
//   "iat": number,
//   "exp": number
// }
