import { Component, inject } from '@angular/core';
import { Api } from '../services/api';
import { Subscription } from 'rxjs';
import { IList } from '../services/interfaces';

@Component({
  selector: 'app-lists',
  imports: [],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class Lists {
  private readonly apiService = inject(Api);
  private subscription!: Subscription;
  listsArray: IList[] = [];
  errorLoadingApi = false;
  loading = true;
  createList = false;

  ngOnInit(): void {
    this.subscription = this.apiService.getAllLists().subscribe({
      next: (data) => {
        this.listsArray = data;
      },
      error: () => {
        this.errorLoadingApi = true;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  openCreateList(): void {
    this.createList = true;
  }
  closeCreateList(): void {
    this.createList = false;
  }
}
