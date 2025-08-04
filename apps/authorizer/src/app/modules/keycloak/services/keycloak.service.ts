import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwksRsa, { JwksClient } from 'jwks-rsa';
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';
import { AuthorizeResponse } from '@common/interfaces/grpc/authorizer';

@Injectable()
export class KeycloakService {
  private readonly logger = new Logger(KeycloakService.name);
  private jwksClient: JwksClient;
  private host: string;
  private realm: string;

  constructor(private readonly configService: ConfigService) {
    this.host = this.configService.get('KEYCLOAK_CONFIG.HOST');
    this.realm = this.configService.get('KEYCLOAK_CONFIG.REALM');

    this.jwksClient = jwksRsa({
      jwksUri: `${this.host}/realms/${this.realm}/protocol/openid-connect/certs`,
      cache: true,
      rateLimit: true,
    });
  }

  async verifyToken(token: string): Promise<AuthorizeResponse> {
    const decoded = jwt.decode(token, { complete: true }) as Jwt;
    if (!decoded || !decoded.header || !decoded.header.kid) {
      throw new UnauthorizedException('Invalid token structure');
    }

    try {
      const key = await this.jwksClient.getSigningKey(decoded.header.kid);

      const publicKey = key.getPublicKey();

      const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as JwtPayload;
      return {
        valid: true,
        metadata: {
          jwt: payload,
          permissions: [],
          userId: payload.sub,
          user: null,
        },
      };
    } catch (error) {
      this.logger.error({ error });
      throw new UnauthorizedException('Token is invalid');
    }
  }
}
