import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from '../services/health.service';

@ApiTags('Health check')
@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get('liveness')
  @HealthCheck()
  checkLive() {
    return this.health.checkMemoryHeap();
  }

  @Get('readiness')
  @HealthCheck()
  checkReady() {
    return this.health.checkReadiness();
  }

  @Get('startup')
  @HealthCheck()
  checkStartup() {
    return this.health.checkStartup();
  }
}
