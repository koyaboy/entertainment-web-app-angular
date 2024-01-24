import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.css'
})
export class BookmarksComponent {
  showsService: ShowsService = inject(ShowsService)
  bookmarkedShows: Shows[] = []
  bookmarkedMovies: Shows[] = []
  bookmarkedSeries: Shows[] = []

  ngOnInit() {
    this.showsService.getShows().subscribe((shows) => {
      this.bookmarkedShows = shows.filter((show) => show.isBookmarked == true)
      this.bookmarkedMovies = shows.filter((show) => show.isBookmarked == true && show.category == "Movie")
      this.bookmarkedSeries = shows.filter((show) => show.isBookmarked == true && show.category == "TV Series")
    })
    this.showsService.setSearchCategory('bookmarked shows')
  }
}
