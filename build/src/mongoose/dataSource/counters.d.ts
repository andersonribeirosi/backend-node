export declare class CountersDataSource {
    models: any;
    constructor(models: any);
    createSeqNext<T>(collectionName: string): Promise<any>;
    seqNext(collectionName: string): Promise<any>;
}
