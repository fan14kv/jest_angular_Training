import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchService } from './search.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Subject } from 'rxjs';
import { UserInterface } from '../types/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;
  let term$: Subject<string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });

    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
    term$ = new Subject<string>();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('search', () => {
    it('Should debounce and only call http once for latest tearm', fakeAsync(() => {
      let result: UserInterface[] | undefined;
      service.search(term$).subscribe(user => result = user);
      term$.next('k');
      tick(100);
      term$.next('ku');
      tick(200);
      term$.next('kum');
      tick(300);
      const req = httpMock.expectOne('/api/users?q=kum');
      expect(req.request.method).toBe('GET');
      req.flush([{ id: '1', name: 'Kumar', isActive: true }]);
      expect(result).toEqual([{ id: '1', name: 'Kumar', isActive: true }])
    }))

    it('should retry 3 times and then fail', fakeAsync(() => {
      let errorMessage : HttpErrorResponse | undefined;
      service.search(term$).subscribe({
        next: () => {
          fail("success shoud not call")
        },
        error: (err) => {
          errorMessage = err;
        }
      });
      term$.next('kum');
      tick(300);
       const req = httpMock.expectOne('/api/users?q=kum');
       req.flush('fail',{status:500, statusText:'server Error'});
        tick(1000);
       const req1 = httpMock.expectOne('/api/users?q=kum');
       req1.flush('fail',{status:500, statusText:'server Error'});
        tick(1000);
       const req2 = httpMock.expectOne('/api/users?q=kum');
       req2.flush('fail',{status:500, statusText:'server Error'});
        tick(1000);
       const req3 = httpMock.expectOne('/api/users?q=kum');
       req3.flush('fail',{status:500, statusText:'server Error'});

       expect(errorMessage?.status).toBe(500);
    }))
  })

});
