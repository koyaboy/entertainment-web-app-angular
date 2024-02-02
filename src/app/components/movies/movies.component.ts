import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  showsService: ShowsService = inject(ShowsService)
  movies: Shows[] = []
  filterValue: string = ""
  filteredMovies: Shows[] = []
  isLoading!: boolean

  constructor() {
    this.showsService.filterValue.subscribe((filter) => {
      this.filterValue = filter
      this.filteredMovies = this.movies.filter((movie) => movie.title.includes(this.filterValue))
    })

    this.showsService.isLoading.subscribe((loadingValue) => {
      this.isLoading = loadingValue
    })
  }

  ngOnInit() {
    this.showsService.getShows().subscribe((shows) => [
      this.movies = shows.filter((show) => show.category == "Movie")
    ])
    this.showsService.setSearchCategory('movies')
  }
}
