import { TestBed } from "@angular/core/testing"
import { UserService } from "./user.service"
import { Directive } from "@angular/core";
import { UserInterface } from "../types/user.interface";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe("UserService",()=> {
    let userService : UserService;
    let httpClient : HttpTestingController;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers:[UserService]
        });
        userService = TestBed.inject(UserService);
        httpClient = TestBed.inject(HttpTestingController);
    });

    it("Service Should be called",()=>{
        expect(userService).toBeTruthy();
    });

    describe('addUser',()=>{
        it('should add a user',()=>{
            const user:UserInterface={
                id:"3",
                name:"Raja",
                isActive: true
            };
            expect(user).toMatchSnapshot();
            userService.addUser(user);
            expect(userService.users$.getValue()).toEqual([{id:"3",name:"Raja",isActive: true}])
        });

        it('Reactive Subscription Test',()=>{
            const user:UserInterface={
                id:"3",
                name:"kumar",
                isActive: true
            }
            userService.addUser(user);
            userService.users$.subscribe(user =>{
                expect(user).toEqual([{id:"3",name:"kumar",isActive: true}]);
            })
        });
    });
    describe('removeUser',()=>{
        it("should remove a user",()=>{
            userService.users$.next([{
                id:"1",
                name:"raj",
                isActive: true
            },
            {
                id:"3",
                name:"kumar",
                isActive: true
            }
        ]);
            userService.removeUser("3");
            expect(userService.users$.getValue()).toEqual([{id:"1",name:"raj",isActive: true}])
        });
    });
});