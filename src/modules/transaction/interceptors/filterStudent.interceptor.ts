import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from 'src/shared/enums';
import { UserGeneric } from 'src/shared/interfaces';

@Injectable()
export class FilterStudentInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserGeneric;
    if (user.role === Roles.STUDENT) {
      request.query.toUserId = user.sub;
    }

    return next.handle();
  }
}
