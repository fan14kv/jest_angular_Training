export const range = (start : number, end : number): number[]=>{
    return [...Array(end - start).keys()].map((e) => e + start);
}

export const pluck = (elements:any[], field:string) =>{
    return elements.map((el) => el[field]);
}
