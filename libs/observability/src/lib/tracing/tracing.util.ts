import { ClientProxy } from '@nestjs/microservices';
import { context, propagation } from '@opentelemetry/api';
import { Observable } from 'rxjs';

export interface Carrier {
  traceparent?: string;
  tracestate?: string;
}

/**
 * Creates a Proxy to transparently inject OpenTelemetry tracing context
 * into client send/emit methods.
 * @param client The ClientProxy to wrap
 */
export function createTracingClientProxy<T extends ClientProxy>(client: T): T {
  return new Proxy(client as any, {
    get: (target, prop) => {
      // Intercept 'send' method
      if (prop === 'send') {
        return (pattern: any, data: any) => wrapRequest(target, 'send', pattern, data);
      }
      // Intercept 'emit' method
      if (prop === 'emit') {
        return (pattern: any, data: any) => wrapRequest(target, 'emit', pattern, data);
      }
      // Pass through all other properties
      return target[prop];
    },
  });
}

function wrapRequest(client: ClientProxy, method: 'send' | 'emit', pattern: any, data: any): Observable<any> {
  const carrier: Carrier = {};

  // Inject current active context into the carrier
  propagation.inject(context.active(), carrier);

  // Wrap payload with tracing info
  const payloadWithTrace = {
    data: data,
    __tracing__: carrier,
  };

  // Forward request
  return client[method](pattern, payloadWithTrace);
}
