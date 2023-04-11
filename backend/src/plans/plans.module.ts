import { Module } from '@nestjs/common';
import PlansController from './plans.controller';
import PlansService from './plans.service';
import Plan from './plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
