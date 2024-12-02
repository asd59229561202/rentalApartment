import { Types } from 'mongoose';
export class User {
  id!: Types.ObjectId;
  email!: string;
  phone!: string;
  username!: string;
  password!: string;
  name!: string;
  token!: string;
  isLandlord!: boolean;
  isadmin!: boolean;
  properties!: Array<{_id: string; title: string }>;
 
}
