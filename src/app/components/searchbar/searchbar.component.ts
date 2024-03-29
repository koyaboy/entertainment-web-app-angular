import { ChangeDetectionStrategy, Component, WritableSignal, inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ShowsService } from '../../services/shows.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchbarComponent {
  router: Router = inject(Router)
  route: ActivatedRoute = inject(ActivatedRoute)
  showsService: ShowsService = inject(ShowsService)

  searchValue!: string
  category: WritableSignal<string> = this.showsService.category

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.searchValue = ""
        this.showsService.setFilterValue("")
      }
    })
  }

  updateSearchValue(value: string) {
    let arr = value.split(' ')

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== "") {
        arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1).toLowerCase()
      }
    }

    let transformedValue = arr.join(' ')

    this.searchValue = transformedValue
    this.showsService.filterShows(this.searchValue)
  }
}
