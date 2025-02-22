import { Injectable } from '@angular/core';
import { IClient } from '../models/client.model';
import { IServiceType } from '../models/serviceType.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentClientService {
  private currentClient = {};
  private selectedServices: IServiceType[] = [];
  constructor() {}

  setClient(client: IClient | object, branch: string) {
    this.currentClient = { ...client, branch };
  }

  getClient(): object {
    return this.currentClient;
  }

  setServices(selectedServices: IServiceType[]) {
    this.selectedServices = selectedServices;
  }

  getServices(): IServiceType[] {
    return this.selectedServices;
  }
}
