import { MetadataKeys } from '@common/constants/decorators.constant';
import { AuthorizationOptions } from '@common/interfaces/common/authorizer.interface';
import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const Authorization = ({ secured = false }: AuthorizationOptions) => {
  const setMetadata = SetMetadata(MetadataKeys.SECURED, {
    secured,
  });

  if (secured) {
    const decorators = [ApiBearerAuth()];

    return applyDecorators(...decorators, setMetadata);
  }

  return setMetadata;
};
