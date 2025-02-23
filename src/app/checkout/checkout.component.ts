import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CurrentClientService } from '../services/current-client.service';
import { ClientInfoComponent } from '../client-info/client-info.component';
import { IClient } from '../models/client.model';
import { IServiceType } from '../models/serviceType.model';
import { OrderService } from '../services/order.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-checkout',
  imports: [
    MatCardModule,
    ClientInfoComponent,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    NgFor,
    NgIf,
    MatButtonModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly DISCOUNT: number = 3;
  public client: IClient;
  public branch: string;
  public selectedServices: IServiceType[];
  public regularClient: boolean;
  public initialSum = 0;
  public currentSum = 0;
  private options: Record<string, boolean> = {
    urgency: false,
    specialWash: false,
  };
  public isLoading = false;

  constructor(
    private router: Router,
    private currentClient: CurrentClientService,
    private orderService: OrderService,
    private clientService: ClientService,
    private dialog: MatDialog
  ) {
    this.client = currentClient.getClient() as IClient;
    this.branch = currentClient.getBranch();
    this.selectedServices = currentClient.getServices();
    this.regularClient = this.client.isRegular as boolean;
    this.initialSum = this.calcInitialSum();
  }

  calcInitialSum(): number {
    const sum = this.selectedServices.reduce(
      (acc, elem) => acc + elem.price,
      0
    );
    if (!this.regularClient) return sum;
    return sum * (1 - this.DISCOUNT / 100);
  }

  recalculateSum(checked: boolean, value: string) {
    if (value in this.options) {
      this.options[value] = checked;
    }
    let extra = 0;

    if (this.options['urgency'] && this.options['specialWash']) {
      extra = 25;
    } else if (!this.options['urgency'] && this.options['specialWash']) {
      extra = 10;
    } else if (this.options['urgency'] && !this.options['specialWash']) {
      extra = 15;
    }

    this.currentSum = Math.round(this.initialSum * (1 + extra / 100));
  }

  ngOnInit(): void {
    if (Object.keys(this.currentClient.getClient()).length === 0) {
      this.router.navigate(['new-order']);
    }
    if (Object.keys(this.currentClient.getServices()).length === 0) {
      this.router.navigate(['services']);
    }
  }

  back() {
    this.currentClient.resetCurrentClient();
    this.router.navigate(['']);
  }

  onSubmit() {
    this.isLoading = true;
    const newOrder = {
      clientId: this.client._id,
      serviceTypesId: this.selectedServices.filter((el) => el._id),
      branch: this.branch,
      status: 'Received',
      totalPrice: this.currentSum ? this.currentSum : this.initialSum,
    };

    this.orderService.createNewOrder(newOrder).subscribe({
      next: () => {
        if (this.currentClient.getVisits() === 1) {
          this.clientService.changeStatus(this.client).subscribe({
            error: (res) => console.log(res.error.message),
          });
        }
        this.dialog.open(DialogComponent, {
          data: {
            message: 'Замовлення успішно створене!',
            title: 'Підтвердження',
          },
        });
      },

      error: () => {
        this.dialog.open(DialogComponent, {
          data: {
            message: 'На жаль, не вдалося створити замовлення',
            title: 'Помилка!',
          },
        });
      },
      complete: () => {
        this.isLoading = false;
        this.dialog.afterAllClosed.subscribe({
          next: () => this.back(),
        });
      },
    });
  }
}
