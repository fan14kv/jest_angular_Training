import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ApiService } from "./api.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ErrorHandler, Testability } from "@angular/core";
import { TagInterface } from '../types/tag.interface';

describe('ApiService', () => {
    let apiService: ApiService;
    let httpTestingController:HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers: [ApiService],
        });
        apiService = TestBed.inject(ApiService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(()=>{
        httpTestingController.verify();
    });

    it('creates service', () => {
        expect(apiService).toBeTruthy();
    });

    describe("getTags",()=>{
        it("should return a value",()=>{
            let tag: TagInterface[] | undefined;
            apiService.getTags().subscribe((response) =>{
                tag = response;
            });
            const req = httpTestingController.expectOne('http://localhost:3004/tags')
            req.flush([{id:"1",name: "raja"}]);
            expect(tag).toEqual([{id:"1",name: "raja"}]);
            expect(req.request.method).toBe("GET");
        });

        it("should return a value using async delay",fakeAsync(()=>{
            let tag: TagInterface[] | undefined;
            apiService.getTags().subscribe((response) =>{
                tag = response;
            });
            const req = httpTestingController.expectOne('http://localhost:3004/tags');
            expect(req.request.method).toBe("GET");
            tick(2000);
            req.flush([{id:"1",name: "raja"}]);
            expect(tag).toEqual([{id:"1",name: "raja"}]);
        }));

        it("should throws error if respons fails",()=>{
            let errorMessage : HttpErrorResponse | undefined;
            apiService.getTags().subscribe({
                next: ()=>{
                    fail("success shoud not call")
                },
                error:(err)=>{
                    errorMessage = err;
                }
            });
            const req = httpTestingController.expectOne('http://localhost:3004/tags');
            req.flush('Not Found', {status:404, statusText:"Not Found"});
            expect(errorMessage?.status).toBe(404);
            expect(errorMessage?.statusText).toBe("Not Found");
        })
    });

    describe("createTag",()=>{
        it("it should create a tag",()=>{
            let tag: TagInterface | undefined;
            apiService.createTag("kumar").subscribe((response) =>{
                tag = response;
            });
            const req = httpTestingController.expectOne('http://localhost:3004/tags');
            req.flush({id:"1",name: "raja"});
            expect(tag).toEqual({id:"1",name: "raja"});
            expect(req.request.method).toBe('POST')
            expect(req.request.body).toEqual({"name": "kumar"});
        });

         it("should return error",()=>{
            let errorMessage: HttpErrorResponse | undefined;
            apiService.createTag("Raja").subscribe({
                next:()=>{
                     fail("success should not call")
                },
                error:(err)=>{
                    errorMessage = err;
                }
            });
            const req = httpTestingController.expectOne('http://localhost:3004/tags');
            req.flush('Not Found', {status:404, statusText:"Not Found"});
            expect(errorMessage?.status).toBe(404);
            expect(errorMessage?.statusText).toBe("Not Found");
        });
    });

    describe("getTagsWithRetryOnly",()=>{
        it("getTagsWithRetryOnly",()=>{
            let errorMessage : HttpErrorResponse | undefined;
            apiService.getTagsWithRetryOnly().subscribe({
                next:()=>{
                    fail("success shoud not call")
                },
                error:(err)=>{
                    errorMessage = err;
                }
            });
            const req = httpTestingController.expectOne('http://localhost:3004/tags');
            req.flush('Not Found', {status:404, statusText:"Not Found"});
            //expect(errorMessage?.status).toBe(404);
            const req1 = httpTestingController.expectOne('http://localhost:3004/tags');
            req1.flush('Not Found', {status:404, statusText:"Not Found"});
            const req3 = httpTestingController.expectOne('http://localhost:3004/tags');
            req3.flush('Not Found', {status:404, statusText:"Not Found"});
            expect(errorMessage?.status).toBe(404);
        })
    })

});