import { Route, NavData, Candy } from "./interface";
export declare class DocDir {
    dirpath: string;
    ext: string;
    navPrefix: string;
    routePrefix: string;
    candyList: Candy[];
    outPath: string;
    outRelativePath: string;
    constructor(dirpath: string, outPath: string, ext: string, navPrefix?: string, routePrefix?: string);
    readDirToCandyList(currentPath: string, collection: any[]): Candy[];
    toRoutes(): Route[];
    getRoutePath(filename: string, prefix: string): string;
    getNavPath(filename: string, prefix: string): string;
    getRouteResolve(filename: string, prefix: string): any;
    getLabelName(filename: string): string;
    toNavData(): NavData[];
    toSerialize(obj: any[]): string;
}
