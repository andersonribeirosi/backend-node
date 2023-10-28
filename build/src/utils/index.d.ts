import { IApiResult } from "../mongoose/model";
export declare const createCustomersDefault: () => Promise<void>;
export declare const createCompaniesDefault: () => Promise<void>;
export declare const createDefaultConfig: () => Promise<void>;
export declare class Validator {
    static exceptionsMsgs: {
        requiredExceptionUserName: Error;
        requiredExceptionUserLogin: Error;
        requiredExceptionUserPwd: Error;
        duplicatedExceptionLogin: Error;
    };
}
export declare const isDuplicated: (error: any, keyValue: any) => any;
export declare const isEmpty: (value: any, include?: any[]) => boolean;
export declare class CryptUtils {
    static secretKey: string;
    static crypt(text: string): string;
    static decrypt: (text: string) => string;
    static cryptMD5(text: string): string;
    static parseJwt(token: any): any;
}
export declare class ApiUtils {
    static apiResult<T>({ data, success, count, msg }: {
        data: T;
        success: boolean;
        count?: number;
        msg?: string;
    }): IApiResult<T>;
}
