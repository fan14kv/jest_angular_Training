import { TestBed } from "@angular/core/testing"
import { UserSignalStore } from "./user-signal.store"
import { UserService } from "./user.service";
import { UserInterface } from "../types/user.interface";
import { of } from "rxjs";

describe("UserSignalStore",()=>{
    let store : UserSignalStore;
    const mockUser: UserInterface[]=[
        {id:"1",name:"Kumar",isActive:true},
        {id:"2",name:"Raja",isActive:false}
    ]
    const mockUserService ={
        getUsers:jest.fn().mockReturnValue(of(mockUser))
    }

    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers:[UserSignalStore,
                {provide: UserService, useValue: mockUserService}
            ]
        });
        store = TestBed.inject(UserSignalStore);
    });

    it("should load users from User Service",()=>{
        expect(mockUserService.getUsers).toHaveBeenCalled();
        expect(store.users()).toEqual([
        {id:"1",name:"Kumar",isActive:true},
        {id:"2",name:"Raja",isActive:false}
    ])
    })

    it('should filter active users',()=>{
        store.filter.set('active');
        expect(store.visibleUsers()).toEqual([{id:"1",name:"Kumar",isActive:true}]);
    });

    it('should return all the Users',()=>{
        store.filter.set('all');
        expect(store.visibleUsers()).toEqual([
        {id:"1",name:"Kumar",isActive:true},
        {id:"2",name:"Raja",isActive:false}
    ]);
    });
})