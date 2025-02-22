import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IClient } from '../models/client.model';
import { CurrentClientService } from '../services/current-client.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-client-info',
  imports: [MatCardModule, NgIf],
  templateUrl: './client-info.component.html',
  styleUrl: './client-info.component.scss',
})
export class ClientInfoComponent {
  public client: IClient;
  constructor(private currentClient: CurrentClientService) {
    this.client = this.currentClient.getClient() as IClient;
  }
}
