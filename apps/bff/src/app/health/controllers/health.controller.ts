import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from '../services/health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('live')
  @HealthCheck()
  checkLive() {
    return this.healthService.checkMemoryHeap();
  }

  @Get('readiness')
  @HealthCheck()
  check() {
    return this.healthService.checkReadiness();
  }
}
