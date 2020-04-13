export interface NavData {
    children?: NavData[];
    label?: string;
    icon?: string;
    path?: string;
}
export interface Route {
    path: string;
    component: any;
    pageName: string;
}
export interface Candy {
    filename: string;
    filePath: string;
    children?: Candy[];
}
