import { IsNotEmpty, IsString, IsBoolean, validateSync } from 'class-validator';
import { Logger } from '@nestjs/common';

export class BaseConfiguration {
    @IsString()
    @IsNotEmpty()
    NODE_ENV: string;

    @IsBoolean()
    IS_DEV: boolean;

    @IsString()
    @IsNotEmpty()
    GLOBAL_PREFIX: string;



    constructor() {
        this.NODE_ENV = process.env['NODE_ENV'] || 'development';
        this.IS_DEV = this.NODE_ENV === 'development';
        this.GLOBAL_PREFIX = process.env['GLOBAL_PREFIX'] || 'api/v1';
    }

    validate(): void {
        const errors = validateSync(this);
        if (errors.length > 0) {
            const _errors = errors.map((error) => {
                return error.children;
            });

            Logger.error(_errors);

            throw new Error('Configuration is invalid');
        }
    }
}
