export interface PaginationParams{
    currentPage:number;
    pageSize:number;
    total?:number;
}
export type PageChangeFn=(params:PaginationParams)=>void;

