import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

// This interface limits the arguments passed in this decorator
// to class types to help type checking.
// It is not a foolproof solution, however.
interface ClassConstructor {
  new (...args: any[]): unknown;
}

//Take an object from the DB and serialize it into a json
//Implements the NestInterceptor interface

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Runs something before a request is handled
    // by the request handler
    console.log('before handler', context);
    return handler.handle().pipe(
      map((data: any) => {
        // Runs something before the response is sent out
        console.log('before response is sent out', data);
        return plainToClass(this.dto, data, { excludeExtraneousValues: false });
      }),
    );
  }
}
