import { Options } from "../model";
export declare class DataSource {
    static create<T>({ data, model, options }: {
        data: T;
        model: any;
        options?: Options;
    }): Promise<any>;
    static read({ model, options }: {
        model: any;
        options?: Options;
    }): Promise<any>;
    static update<T>({ data, model, options }: {
        data: T;
        model: any;
        options?: Options;
    }): Promise<T>;
}
