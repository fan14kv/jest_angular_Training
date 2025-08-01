import { TruncatePipe } from "./truncate.pipe"

describe('truncate',()=>{
    const pipe = new TruncatePipe();
    it("should exceed limt",()=>{
        expect(pipe.transform("Hello World",5)).toBe("Hello...");
    });
    it("should not exceeded the limt",()=>{
        expect(pipe.transform("Hello World",14)).toBe("Hello World");
    });
    it("should return empty return",()=>{
        expect(pipe.transform("",5)).toBe("");
    });
    it("should return empty return without limit",()=>{
        expect(pipe.transform("")).toBe("");
    });
})