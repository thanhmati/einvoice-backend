import { BaseConfiguration } from './base.config';

/**
 * Helper to create, validate, and export a typed configuration instance.
 * Eliminates the repeated boilerplate at the bottom of every
 * apps/*/src/configuration/index.ts file.
 *
 * @example
 * ```ts
 * class MyConfig extends BaseConfiguration {
 *   @ValidateNested()
 *   @Type(() => AppConfiguration)
 *   APP_CONFIG = new AppConfiguration();
 * }
 *
 * export const { CONFIGURATION, TConfiguration } = createConfiguration(MyConfig);
 * // or:
 * const config = createConfiguration(MyConfig);
 * export const CONFIGURATION = config.CONFIGURATION;
 * export type TConfiguration = typeof CONFIGURATION;
 * ```
 */
export function createConfiguration<T extends BaseConfiguration>(
  ConfigClass: new () => T,
): { CONFIGURATION: T } {
  const instance = new ConfigClass();
  instance.validate();
  return { CONFIGURATION: instance };
}
