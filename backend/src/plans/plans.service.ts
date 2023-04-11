import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/createPlan.dto';
import { Plan } from './plan.interface';
import { UpdatePlanDto } from './dto/updatePlan.dto';

@Injectable()
export default class PlansService {
  private lastPlanId = 0;
  private plans: Plan[] = [];

  getAllPlans() {
    return this.plans;
  }

  getPlanById(id: number) {
    const plan = this.plans.find((plan) => plan.id === id);
    if (plan) {
      return plan;
    } else {
      throw new HttpException('Plan not found', HttpStatus.NOT_FOUND);
    }
  }

  updatePlan(id: number, plan: UpdatePlanDto) {
    const planIndex = this.plans.findIndex((plan) => plan.id === id);
    if (planIndex > -1) {
      this.plans[planIndex] = plan;
      return plan;
    } else {
      throw new HttpException('Plan not found', HttpStatus.NOT_FOUND);
    }
  }

  createPlan(plan: CreatePlanDto) {
    const newPlan = { id: ++this.lastPlanId, ...plan };
    this.plans.push(newPlan);
    return newPlan;
  }

  deletePlan(id: number) {
    const planIndex = this.plans.findIndex((plan) => plan.id === id);
    if (planIndex > -1) {
      this.plans.splice(planIndex, 1);
    } else {
      throw new HttpException('Plan not found', HttpStatus.NOT_FOUND);
    }
  }
}
