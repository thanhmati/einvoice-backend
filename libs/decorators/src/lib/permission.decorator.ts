import { MetadataKeys } from '@common/constants/decorators.constant';
import { PERMISSION } from '@common/constants/role.constant';
import { SetMetadata } from '@nestjs/common';

export const Permissions = (...permissions: PERMISSION[]) => SetMetadata(MetadataKeys.PERMISSIONS, permissions);
