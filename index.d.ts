declare module 'easy-json-database' {
    
    interface SnapshotsOptions {
        enabled: boolean;
        path?: string;
        interval?: number;
    };

    interface DatabaseOptions {
        snapshots?: SnapshotsOptions;
    };

    interface DatabaseElement {
        key: string;
        data: unknown;
    };

    export default class EasyJsonDB {
        constructor (filePath?: string, options?: DatabaseOptions);

        public jsonFilePath: string;
        public options: DatabaseOptions;
        public data: Record<string, unknown>;

        private fetchDataFromFile (): void;
        private saveDataToFile (): void;

        public makeSnapshot (path?: string): void;
        public get (key: string): unknown;
        public set (key: string, value: any): void;
        public has (key: string): boolean;
        public delete (key: string): void;
        public add (key: string, count: number): void;
        public subtract (key: string, count: number): void;
        public push (key: string, element: any): void;
        public clear (key: string): void;
        public all (): DatabaseElement[];
    }
}