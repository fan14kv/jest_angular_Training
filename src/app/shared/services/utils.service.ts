import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

    range (start: number, end: number): number[]{
        return [...Array(end - start).keys()].map((e) => e + start);
    }

    pluck(elements: any[], field: string){
        console.log("pluck");
        return elements.map((el) => el[field]);
    }

    //Create mothod for adding two values
    add(a: number, b: number): number {
        return a + b;
    }

    //create methode for multiply two values
    multiply(a: number, b: number): number {
        return a * b;
    }
    
    //create method for divide two values
    divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return a / b;
    }


}