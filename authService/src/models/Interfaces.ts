export interface IOtp {
  contact: number,
  country_code: number,
  otp: string,
  otpId: string
}

export interface IError {
  status: number;
  statusText: string;
  message?: string
}

export interface IToken {
  iv: string;
  encryptedData: string;
}