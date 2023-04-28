import { roles } from '@/config/constants';

export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  firstName: string;
  lastName: string;
  phone?: string;
  idNumber?: string;
  idType?: IDTypes;
  isVerified?: boolean;
  isEmailVerified?: boolean;
  role: (typeof roles)[number];
}

export enum IDTypes {
  'NATIONAL_ID' = 'National_ID',
  'PASSPORT' = 'PASSPORT',
  'DRIVING_LICENSE' = 'DRIVING_LICENSE',
  'OTHER' = 'OTHER',
}
