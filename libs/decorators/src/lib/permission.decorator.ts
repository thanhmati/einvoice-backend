import { PERMISSION } from '@common/constants/enum/role.enum';
import { Reflector } from '@nestjs/core';

export const Permissions = Reflector.createDecorator<PERMISSION[]>();
