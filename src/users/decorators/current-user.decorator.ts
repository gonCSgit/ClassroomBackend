import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// We want to pass onto the handlers the current user on the session object
// everytime we give them use, however, it would be cumbersome to always have to
// access the session object and return the findById method of usersService.
// For that we will build a custom decorator called CurrentUser that will be passed
// onto the route handlers as arguments to automate this process.
// But because the usersService is an injectable dependancy and decorators cannot use them
// we will also be building an interceptor that will be in charge of adding the currently
// logged userId to the request BEFORE it reaches the handler. This will then allow the
// custom decorator to pick up the currentUser prop and make use of it.
// And yes, we could technically access the Request object with the Request decorator at the
// route handler level but this method makes this process more linear.

// ExecutionContext will effectively be used to reference an
// incoming Request Type in this case but this specific type
// is used to abstract other things like a websocket,
// incoming message, GRPC request, an HTTP request, GraphQL, etc...

export const CurrentUser = createParamDecorator(
  // By assigning a parameter as never we will not allow an
  // argument to be passed to this decorator when used
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
