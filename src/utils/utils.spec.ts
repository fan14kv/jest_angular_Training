import { range ,pluck } from "../utils/utils"
describe("utils", () => {

    describe("range", () => {
        it("returns range between 1 to 5", () => {
            expect(range(1, 5)).toEqual([1, 2, 3, 4]);
        });
        it("returns range between 37 to 40", () => {
            expect(range(37, 40)).toEqual([37, 38, 39]);
        });
    });

    describe("pluck", () => {
        it("returns currect value", () => {
            const element=[
                {id:1 ,item:"car"},
                {id:2 ,item:"bus"},
                {id:3 ,item:"bike"}
            ]
            expect(pluck(element,"item")).toEqual(["car", "bus", "bike"]);
        });
    })
})