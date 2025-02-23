import { Injectable } from '@angular/core';
import { IClient } from '../models/client.model';
import { IServiceType } from '../models/serviceType.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentClientService {
  private currentClient = {};
  private branch = '';
  private selectedServices: IServiceType[] = [];
  private visits: number = 0;
  constructor() {}

  setClient(client: IClient | object) {
    this.currentClient = { ...client };
  }

  getClient(): object {
    return this.currentClient;
  }

  setBranch(branch: string) {
    this.branch = branch;
  }

  getBranch(): string {
    return this.branch;
  }

  setServices(selectedServices: IServiceType[]) {
    this.selectedServices = selectedServices;
  }

  getServices(): IServiceType[] {
    return this.selectedServices;
  }

  setVisits(visits: number) {
    this.visits = visits;
  }

  getVisits(): number {
    return this.visits;
  }

  resetCurrentClient(): void {
    this.setServices([]);
    this.setBranch('');
    this.setClient({});
  }
}
