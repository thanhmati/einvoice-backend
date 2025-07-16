import { IsString, IsNumber, IsUrl, IsNotEmpty } from 'class-validator';

export class AppConfiguration {
    @IsNumber()
    PORT: number;

    @IsString()
    @IsNotEmpty()
    @IsUrl({
        require_tld: false,
    })
    DOMAIN: string;


    constructor() {
        this.PORT = Number(process.env['PORT']) || 3300;
        this.DOMAIN = process.env['DOMAIN'] || 'http://localhost:3300';
    }
}
