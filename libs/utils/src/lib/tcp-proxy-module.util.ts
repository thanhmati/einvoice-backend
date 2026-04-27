import { Module, Type, DynamicModule } from '@nestjs/common';
import { TcpProvider } from '@common/configuration/tcp.config';

/**
 * Creates a NestJS module that acts as a TCP proxy for a BFF controller.
 * Eliminates the duplicated module boilerplate across BFF proxy modules.
 *
 * @param controller - The controller class to register
 * @param tcpServiceName - The TCP service key (from TCP_SERVICES enum)
 * @returns A NestJS Module class
 *
 * @example
 * ```ts
 * // Before (duplicated in every module):
 * @Module({
 *   imports: [],
 *   controllers: [InvoiceController],
 *   providers: [TcpProvider(TCP_SERVICES.INVOICE_SERVICE)],
 *   exports: [],
 * })
 * export class InvoiceModule {}
 *
 * // After:
 * export const InvoiceModule = createTcpProxyModule(
 *   InvoiceController,
 *   TCP_SERVICES.INVOICE_SERVICE,
 * );
 * ```
 */
export function createTcpProxyModule(
  controller: Type<any>,
  tcpServiceName: string,
): Type<any> {
  @Module({
    imports: [],
    controllers: [controller],
    providers: [TcpProvider(tcpServiceName)],
    exports: [],
  })
  class TcpProxyModule {}

  // Preserve the controller name for debugging
  Object.defineProperty(TcpProxyModule, 'name', {
    value: `${controller.name.replace('Controller', '')}Module`,
  });

  return TcpProxyModule;
}
