import { Injectable } from '@angular/core';
import { IClient } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentClientService {
  private currentClient = {};
  constructor() {}

  setClient(client: IClient | object, branch: string) {
    this.currentClient = { ...client, branch };
  }

  getClient(): object {
    return this.currentClient;
  }
}
