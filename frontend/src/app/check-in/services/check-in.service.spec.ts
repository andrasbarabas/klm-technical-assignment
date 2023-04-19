import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CheckInRequest } from 'src/app/check-in/interfaces/check-in-request.interface';
import { CheckInResponse } from 'src/app/check-in/interfaces/check-in-response.interface';

import { CheckInService } from 'src/app/check-in/services/check-in.service';
import { env } from 'src/env';

describe('SecurityService', (): void => {
  let httpTestingController: HttpTestingController;
  let service: CheckInService;

  afterEach(async (): Promise<void> => {
    httpTestingController.verify();
  });

  beforeEach(async (): Promise<void> => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckInService]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CheckInService);
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  it('should call checkIn request', (): void => {
    const request: CheckInRequest = { bookingCode: 'ABCD12', familyName: 'Doe' };
    const response: CheckInResponse = { token: 'abcd' };

    service.checkIn(request).subscribe((r: CheckInResponse): void => {
      expect(r).toBeTruthy();
      expect(r.token).toBeTruthy();
    });

    const testRequest: TestRequest = httpTestingController.expectOne(`${env.apiUrl}/api/check-in`);

    expect(testRequest.request.method).toEqual('POST');

    testRequest.flush(response);
  });
});
