import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { IClient } from '../models/client.model';
import { ClientService } from '../services/client.service';
import { CurrentClientService } from '../services/current-client.service';

@Component({
  selector: 'app-new-order',
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss',
})
export class NewOrderComponent {
  public orderForm: FormGroup;
  public errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private currentClient: CurrentClientService
  ) {
    this.orderForm = this.fb.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      middleName: ['', Validators.required],
      branch: ['', Validators.required],
    });
  }

  returnToPrevious() {
    this.router.navigate(['']);
  }

  onSubmit() {
    const { firstName, surname, middleName, branch } = this.orderForm.value;
    const client: IClient = { firstName, surname, middleName };

    this.clientService.getClient(client).subscribe({
      next: (res) => {
        this.currentClient.setClient(res);
        this.currentClient.setBranch(branch);
        this.router.navigate(['/services']);
      },
      error: (res) => {
        this.errorMessage = res.error.message;
      },
    });
  }
}
