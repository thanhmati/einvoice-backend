import { Observable } from 'rxjs';
import { Response } from '../common/response.interface';
import { User } from '@common/schemas/user.schema';

export interface UserById {
  userId: string;
  processId: string;
}

export interface UserAccessService {
  getByUserId(data: UserById): Observable<Response<User>>;
}
