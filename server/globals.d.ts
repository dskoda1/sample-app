declare interface ExpressAuthenticatedContext {
  req: {
    session: {
      UserId: string;
    }
  }
}

interface ResolverContext {
  UserId: string;
  models: any;
}

