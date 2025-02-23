import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectChange } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BRANCHES, Branch } from '../models/dryCleaning.model';
import { BranchService } from '../services/branch.service';

@Component({
  selector: 'app-select-branch',
  imports: [MatCardModule, MatSelectModule, NgFor, MatFormFieldModule],
  templateUrl: './select-branch.component.html',
  styleUrl: './select-branch.component.scss',
})
export class SelectBranchComponent implements OnInit {
  public allBranches = BRANCHES;
  private currentBranch: string;
  public isLoading: boolean;

  constructor(private branchService: BranchService) {
    this.currentBranch = Branch.all;
    this.isLoading = false;
  }

  ngOnInit() {
    this.currentBranch = this.branchService.getBranch();
  }

  changeValue($event: MatSelectChange) {
    this.currentBranch = $event.value;
    this.branchService.setBranch(this.currentBranch);
  }
}
