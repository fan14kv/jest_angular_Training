//create unit test for utilsService methods
//describe for utilsService methods
// import { UtilsService } from './utils.service';
import { UtilsService } from './utils.service';
describe("UtilsService", () => {
    let utilsService: UtilsService;

    beforeEach(() => {
        utilsService = new UtilsService();
    });

    it("should create the service", () => {
        expect(utilsService).toBeTruthy();
    });

    describe("range", () => {
        it("should return an array of numbers from start to end", () => {
            expect(utilsService.range(1, 5)).toEqual([1, 2, 3, 4]);
        });
    });

    describe("pluck", () => {
        it("should extract specified field from each object in the array", () => {
            const elements = [{ name: "Alice" }, { name: "Bob" }];
            expect(utilsService.pluck(elements, "name")).toEqual(["Alice", "Bob"]);
        });
    });

    describe("add", () => {
        it("should return the sum of two numbers", () => {
            expect(utilsService.add(2, 3)).toBe(5);
        });
    });

    describe("multiply", () => {
        it("should return the product of two numbers", () => {
            expect(utilsService.multiply(2, 3)).toBe(6);
        });
    });

    describe("divide", () => {
        it("should return the quotient of two numbers", () => {
            expect(utilsService.divide(6, 3)).toBe(2);
        });

        it("should throw an error when dividing by zero", () => {
            expect(() => utilsService.divide(6, 0)).toThrowError("Division by zero is not allowed");
        });
    });
})


