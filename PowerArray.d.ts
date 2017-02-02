interface Array<T> {
    Where(whereConditions: Object, keepOrder? : boolean): Array<T>;
    WhereIndexes(whereConditions: Object, keepOrder : boolean) : Array<Number>;
    RunEach(task: Function, callback?: Function, keepOrder?: boolean, progress?: Function);
    getPropertyFlat(property: string, keepOrder?: boolean, includeDuplicates?: boolean, includeUndefineds?: boolean);
    First(whereConditions);
}

declare function In(list: any): any;
declare function Like(a: any): any;
declare function NotEqualTo3(a: any): any;
