import { MetadataKeys } from '@common/constants/common.constant';
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthorizedMetadata, AuthorizedResult } from '@common/interfaces/tcp/authorizer';

export const UserData = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const userData = request[MetadataKeys.USER_DATA] as AuthorizedResult;

  if (!userData) {
    throw new UnauthorizedException('User data not found');
  }

  return new AuthorizedMetadata(userData?.metadata);
});
