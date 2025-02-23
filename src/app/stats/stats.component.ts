import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IOrder } from '../models/order.model';
import { BranchService } from '../services/branch.service';
import { OrderService } from '../services/order.service';
import { CleaningServicesService } from '../services/cleaning-services.service';
import { IServiceType } from '../models/serviceType.model';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { SelectBranchComponent } from '../select-branch/select-branch.component';
import { CHART_OPTIONS, COLORS } from './chart.utils';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective, SelectBranchComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent implements OnInit {
  public currentBranch: string = '';
  public orders: IOrder[] = [];
  public isLoading: boolean = false;
  private serviceTypes: IServiceType[] = [];
  public stats: { [key: string]: number } = {};
  public legendItems: { color: string; label: string }[] = [];
  private colors = COLORS;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [''],
    datasets: [],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = CHART_OPTIONS;

  constructor(
    private branchService: BranchService,
    private orderService: OrderService,
    private cleaningServices: CleaningServicesService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.cleaningServices.getAllServices().subscribe({
      next: (res) => {
        this.serviceTypes = res;
        this.resetStats();

        this.branchService.currentBranch$.subscribe((branch: string) => {
          this.currentBranch = branch;
          this.findOrdersOnBranch();
        });
      },
      error: (err) => console.log(err.error.errorMessage),
    });
  }

  findOrdersOnBranch() {
    this.isLoading = true;
    this.resetStats();

    this.orderService.findOrders(this.currentBranch).subscribe({
      next: (res) => {
        this.orders = res;
        this.processOrders();
        this.isLoading = false;
      },
      error: (err) => console.log(err.error.message),
    });
  }

  processOrders() {
    this.orders.forEach((order) => {
      order.serviceType.forEach((service) => {
        this.stats[service.type] += 1;
      });
    });

    this.updateChartData();
  }

  updateChartData() {
    const labels = Object.keys(this.stats);
    const data = Object.values(this.stats);

    this.barChartData = {
      labels: [''],
      datasets: labels.map((label, index) => ({
        data: [data[index]],
        backgroundColor: this.colors[index % this.colors.length],
        label: label,
      })),
    };

    this.legendItems = labels.map((label, index) => ({
      label,
      color: this.colors[index % this.colors.length],
    }));
  }

  resetStats() {
    this.stats = {};
    this.serviceTypes.forEach((el) => (this.stats[el.type] = 0));
  }
}
