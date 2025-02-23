import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private currentBranchSubject = new BehaviorSubject<string>('');
  public currentBranch$ = this.currentBranchSubject.asObservable();

  constructor() {}

  setBranch(branch: string) {
    this.currentBranchSubject.next(branch);
  }

  getBranch() {
    return this.currentBranchSubject.value;
  }
}
