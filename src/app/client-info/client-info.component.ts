import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IClient } from '../models/client.model';
import { CurrentClientService } from '../services/current-client.service';
import { NgIf } from '@angular/common';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-info',
  imports: [MatCardModule, NgIf],
  templateUrl: './client-info.component.html',
  styleUrl: './client-info.component.scss',
})
export class ClientInfoComponent implements OnInit {
  public client: IClient;
  public visits: number;
  constructor(
    private currentClient: CurrentClientService,
    private clientService: ClientService
  ) {
    this.client = this.currentClient.getClient() as IClient;
    this.visits = 0;
  }
  ngOnInit(): void {
    console.log(this.client);

    this.clientService.getClientsOrders(this.client).subscribe({
      next: (res) => {
        this.visits = res.length;
        this.currentClient.setVisits(this.visits);
      },
      error: (res) => {
        console.log(res.error.message);
      },
    });
  }
}
