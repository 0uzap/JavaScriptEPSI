import { Injectable, computed, effect, inject, signal, resource } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private http = inject(HttpClient);

  // 🔹 Signal des catégories (extraites au chargement)
  private _categories = signal<string[]>([]);
  readonly categories = computed(() => this._categories());

  constructor() {
    this.loadCategories();
  }

  private loadCategories() {
    this.http.get<{ categories: { strCategory: string }[] }>(`${API_BASE}/categories.php`)
      .subscribe((res) => {
        const cats = res.categories.map(cat => cat.strCategory);
        this._categories.set(cats);
      });
  }

  // 🔹 Resource pour récupérer les recettes selon une catégorie
  readonly recipesResource = resource({
   // (category: string) => this.http.get<{ meals: any[] }>(`${API_BASE}/filter.php?c=${category}`)
    params: () => ({}),

    loader:  ({params}) =>firstValueFrom(this.http.get<{ meals: any[] }>(`${API_BASE}search.php?s=`)),
  });
}
