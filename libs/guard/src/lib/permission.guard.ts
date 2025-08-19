import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PERMISSION } from '@common/constants/role.constant';
import { MetadataKeys } from '@common/constants/decorators.constant';
import { Reflector } from '@nestjs/core';
import { AuthorizedResult } from '@common/interfaces/grpc/authorizer';
import { ERROR_CODE } from '@common/constants/enums/error-code.enum';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<PERMISSION[]>(MetadataKeys.PERMISSIONS, context.getHandler());

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userData = request[MetadataKeys.USER_DATA] as AuthorizedResult;

    const userPermissions = userData?.metadata?.permissions as PERMISSION[];

    const isValid = requiredPermissions.every((permission) => userPermissions?.includes(permission));
    if (!isValid) {
      throw new UnauthorizedException(ERROR_CODE.PERMISSION_DENIED);
    }

    return true;
  }
}
