import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SelectBranchComponent } from '../select-branch/select-branch.component';
import { STATUSES, StatusEnum, status } from '../models/dryCleaning.model';
import { BranchService } from '../services/branch.service';
import { IOrder } from '../models/order.model';
import { OrderService } from '../services/order.service';
import { IServiceType } from '../models/serviceType.model';

@Component({
  selector: 'app-status-list',
  imports: [
    SelectBranchComponent,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './status-list.component.html',
  styleUrl: './status-list.component.scss',
})
export class StatusListComponent implements OnInit {
  public currentBranch: string = '';
  public allStatuses;
  public orders: IOrder[] = [];
  public isLoading: boolean = false;

  constructor(
    private branchService: BranchService,
    private orderService: OrderService
  ) {
    this.allStatuses = STATUSES;
  }

  ngOnInit() {
    this.isLoading = true;
    this.branchService.currentBranch$.subscribe((branch: string) => {
      this.currentBranch = branch;
      this.findOrdersOnBranch(this.currentBranch);
    });
  }

  findOrdersOnBranch(branch: string) {
    this.orderService.findOrders(branch).subscribe({
      next: (res) => {
        this.orders = res;
        this.isLoading = false;
      },
      error: (res) => console.log(res.error.message),
    });
  }

  toStringServices(service: IServiceType[]): string {
    return service.map((el) => el.name).join(', ');
  }

  checkReturned(status: string): boolean {
    return status == StatusEnum.RETURNED;
  }

  changeStatus(status: MatSelectChange, id: string | undefined) {
    const currentStatus = status as unknown as status;
    this.orderService.changeStatus(currentStatus, id as string).subscribe({
      next: () => {
        this.findOrdersOnBranch(this.currentBranch);
      },
      error: (res) => console.log(res.error.message),
    });
  }

  transformDate(date: Date | undefined): string {
    if (date) {
      return new Date(date).toLocaleString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      });
    } else {
      return '';
    }
  }
}
