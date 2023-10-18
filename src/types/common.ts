export interface IMeta {
  limit?: number;
  page?: number;
  total?: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type ResponseErrorType = {
  statusCode: number;
  message?: string;
  errorMessages?: IGenericErrorMessage[];
};

type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type UserInfoProps = {
  userId?: string;
  userEmail?: string;
  role?: string;
};

export interface Column {
  id?: string;
  label?: string;
  minWidth?: number;
  align?: "center" | "left" | "right" | "inherit" | "justify" | undefined;
  format?: (value: any) => any;
  render?: (value: any) => any;
}

export interface IDivision {
  data?: any;
  meta?: any;
}

export interface IDistrict {
  [x: string]: any;
  data?: any;
  meta?: any;
}

export interface IPlace {
  data?: any;
  meta?: any;
}

export interface IHotel {
  data?: any;
  meta?: any;
}


export interface UserType {
  firstName: string;
  middleName?: string
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
}