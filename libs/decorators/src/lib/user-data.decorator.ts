import { EXECUTION_CONTEXT_REQ_INDEX, MetadataKeys } from '@common/constants/decorators.constant';
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthorizedMetadata, AuthorizeResponse } from '@common/interfaces/grpc/authorizer';

export const UserData = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const req = ctx.getArgByIndex(EXECUTION_CONTEXT_REQ_INDEX);

  const userData = req[MetadataKeys.USER_DATA] as AuthorizeResponse;

  if (!userData) {
    throw new UnauthorizedException('User data not found');
  }

  return new AuthorizedMetadata(userData?.metadata);
});
