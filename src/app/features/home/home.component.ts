import { Component, inject, OnInit } from '@angular/core';
import { TmdbService } from '../../shared/services/tmdb.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private tmdbService: TmdbService = inject(TmdbService);
 public readonly authService = inject(AuthService);
 private router = inject(Router);
  trendingMovies: any[] = [];
  romanceMovies: any[] = [];
  horrorMovies: any[] = [];
  actionMovies: any[] = [];
  documentaries: any[] = [];
  netflixOriginals: any[] = [];
  genres: any[] = [];
  genreMovies: any = {};
  randomTrendingMovie: any = null;

  ngOnInit(): void {
    this.tmdbService.getTrendingMovies().subscribe((response: any) => {
      this.trendingMovies = response.results;
      this.randomTrendingMovie = this.tmdbService.getRandomTrendingMovie(
        this.trendingMovies
      );
      this.genres = this.tmdbService.getGenres();
      this.fetchMoviesByGenres();
    });

    this.tmdbService.getRomanceMovies().subscribe((response: any) => {
      this.romanceMovies = response.results;
    });

    this.tmdbService.getHorrorMovies().subscribe((response: any) => {
      this.horrorMovies = response.results;
    });

    this.tmdbService.getActionMovies().subscribe((response: any) => {
      this.actionMovies = response.results;
    });

    this.tmdbService.getDocumentaries().subscribe((response: any) => {
      this.documentaries = response.results;
    });
    this.tmdbService.getNetflixOriginals().subscribe((response: any) => {
      this.netflixOriginals = response.results;
    });
    console.log(this.netflixOriginals);
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          userName: user.displayName!,
        });
      }else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig())
    });
  }

  fetchMoviesByGenres(): void {
    this.genres.forEach((genre) => {
      this.tmdbService.getMoviesByGenre(genre.id).subscribe((response: any) => {
        this.genreMovies[genre.name] = response.results;
      });
    });
  }

  getGenreNames(genreIds: number[]): string {
    return genreIds
      .map((id) => this.genres.find((genre) => genre.id === id)?.name)
      .filter((name) => name)
      .join(', ');
  }

  getImageUrl(path: string): string {
    return path ? `https://image.tmdb.org/t/p/w1280${path}` : '';
  }
  logOut():void{
    this.authService.logOut();
    this.router.navigateByUrl('/auth/sign-in')
  }
  showItems: boolean = false;

  toggleItems() {
    this.showItems = !this.showItems;
  }
}
