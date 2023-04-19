import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckInRequest } from 'src/app/check-in/interfaces/check-in-request.interface';
import { CheckInResponse } from 'src/app/check-in/interfaces/check-in-response.interface';

import { env } from 'src/env';

@Injectable({ providedIn: 'root' })
export class CheckInService {
  constructor(private httpClient: HttpClient) {}

  checkIn(checkInRequest: CheckInRequest): Observable<CheckInResponse> {
    return this.httpClient.post<CheckInResponse>(`${env.apiUrl}/api/check-in`, checkInRequest);
  }
}
