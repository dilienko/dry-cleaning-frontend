import { Component, OnInit } from '@angular/core';
import { CurrentClientService } from '../services/current-client.service';
import { Router } from '@angular/router';
import { CleaningServicesService } from '../services/cleaning-services.service';
import { IServiceType } from '../models/serviceType.model';
import { IClient } from '../models/client.model';
import { ClientInfoComponent } from '../client-info/client-info.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-service-list',
  imports: [
    MatCardModule,
    NgIf,
    NgFor,
    MatExpansionModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ClientInfoComponent,
  ],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss',
})
export class ServiceListComponent implements OnInit {
  public serviceTypes: IServiceType[] = [];
  public errorMessage: string = '';
  public client: IClient;
  public groupedServices: { [key: string]: IServiceType[] } = {};
  private selectedServices: IServiceType[] = [];

  constructor(
    private currentClient: CurrentClientService,
    private allServices: CleaningServicesService,
    private router: Router
  ) {
    this.client = this.currentClient.getClient() as IClient;
  }

  ngOnInit() {
    if (Object.keys(this.currentClient.getClient()).length === 0) {
      this.router.navigate(['new-order']);
    }
    this.allServices.getAllServices().subscribe({
      next: (res) => {
        this.serviceTypes = res;
        this.groupServicesByType();
      },
      error: (res) => {
        this.errorMessage = res.error.message;
      },
    });
  }

  groupServicesByType(): void {
    this.groupedServices = this.serviceTypes.reduce((acc, service) => {
      if (!acc[service.type]) {
        acc[service.type] = [];
      }
      acc[service.type].push({ ...service });
      return acc;
    }, {} as { [key: string]: IServiceType[] });
  }

  getPositions(type: string): IServiceType[] {
    return this.serviceTypes.filter((service) => service.type === type);
  }

  changeSelectedServices(checked: boolean, id: string, service: IServiceType) {
    if (checked) {
      this.selectedServices.push(service);
    } else {
      this.selectedServices = this.selectedServices.filter(
        (el) => el['_id'] !== id
      );
    }
  }

  getTypes() {
    return Object.keys(this.groupedServices);
  }

  returnToPrevious() {
    this.router.navigate(['/new-order']);
  }
  onSubmit() {
    if (this.selectedServices.length === 0) {
      this.errorMessage = 'Потрібно обрати хоча б 1 послугу';
      setTimeout(() => (this.errorMessage = ''), 5000);
    } else {
      this.currentClient.setServices(this.selectedServices);
      this.router.navigate(['']);
    }
  }
}
