import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import PlanEntity from './plan.entity';
import PlansService from './plans.service';
import { CreatePlanDto } from './dto/createPlan.dto';
import { UpdatePlanDto } from './dto/updatePlan.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('plans')
@ApiTags('plans')
export default class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  getAllPlans() {
    return this.plansService.getAllPlans();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a plan that exists in the database',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'A plan has been successfully fetched',
    type: PlanEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'A plan with given id does not exist.',
  })
  getPlanById(@Param('id') id: string) {
    return this.plansService.getPlanById(Number(id));
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'New plan has been successfully created',
    type: PlanEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Something goes very wrong, buddy',
  })
  async createPlan(@Body() plan: CreatePlanDto) {
    return this.plansService.createPlan(plan);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a plan that exists in the database',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'A plan has been successfully updated',
    type: PlanEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'A plan with given id does not exist.',
  })
  async updatePlan(@Param('id') id: string, @Body() plan: UpdatePlanDto) {
    return this.plansService.updatePlan(Number(id), plan);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a plan that exists in the database',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'A plan has been successfully deleted',
    type: PlanEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'A plan with given id does not exist.',
  })
  async deletePlan(@Param('id') id: string) {
    this.plansService.deletePlan(Number(id));
  }
}
