import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Item } from '../models';

export interface ItemListResponse {
  success: boolean;
  count: number;
  items: Item[];
  message?: string;
}

export interface ItemResponse {
  success: boolean;
  item: Item & {
    loans?: Array<{
      id: string;
      orgId: string;
      itemId: string;
      borrowerId: string;
      ownerId?: string | null;
      startDate: string;
      endDate: string;
      status: string;
      purpose: string;
      rejectionReason?: string;
      returnConfirmedAt?: string;
      createdAt?: string;
      updatedAt?: string;
      borrower?: { id: string; fullName: string; waNumber?: string };
    }>;
  };
  message?: string;
}

export interface ItemFilterParams {
  search?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/items`;
  private readonly archivedKey = 'sarga_archived_item_ids';

  getItems(params?: ItemFilterParams): Observable<ItemListResponse> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('q', params.search);

    return this.http.get<ItemListResponse>(this.baseUrl, { params: httpParams });
  }

  getItemById(id: string): Observable<ItemResponse> {
    return this.http.get<ItemResponse>(`${this.baseUrl}/${id}`);
  }

  createItem(itemData: Partial<Item>): Observable<ItemResponse> {
    return this.http.post<ItemResponse>(this.baseUrl, itemData);
  }

  getArchivedIds(): string[] {
    try {
      const raw = localStorage.getItem(this.archivedKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  isLocallyArchived(itemId: string): boolean {
    return this.getArchivedIds().includes(itemId);
  }

  archiveItemLocally(itemId: string): void {
    const ids = this.getArchivedIds();
    if (!ids.includes(itemId)) {
      this.saveArchivedIds([...ids, itemId]);
    }
  }

  restoreItemLocally(itemId: string): void {
    const ids = this.getArchivedIds().filter(id => id !== itemId);
    this.saveArchivedIds(ids);
  }

  private saveArchivedIds(ids: string[]): void {
    try {
      localStorage.setItem(this.archivedKey, JSON.stringify(ids));
    } catch {
      // Ignore storage quota errors
    }
  }
}
