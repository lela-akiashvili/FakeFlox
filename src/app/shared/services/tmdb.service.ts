import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private http: HttpClient = inject(HttpClient);
  private apiKey: string = '4473696fb61c356127c6bf4bc008c85f';
  private apiUrl: string = 'https://api.themoviedb.org/3';
  private genres: any[] = [];

  constructor() {
    this.fetchGenres().subscribe((response: any) => {
      this.genres = response.genres;
    });
  }

  getTrendingMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trending/movie/week?api_key=${this.apiKey}`);
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}`);
  }

  fetchGenres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`);
  }

  getMoviesByGenre(genreId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/discover/movie?with_genres=${genreId}&api_key=${this.apiKey}`);
  }

  getRomanceMovies(): Observable<any> {
    const romanceGenreId = 10749;
    return this.getMoviesByGenre(romanceGenreId);
  }

  getRandomTrendingMovie(trendingMovies: any[]): any {
    const moviesWithLargeImages = trendingMovies.filter(movie => movie.backdrop_path || movie.poster_path);
    if (!moviesWithLargeImages.length) return null;
    const randomIndex = Math.floor(Math.random() * moviesWithLargeImages.length);
    return moviesWithLargeImages[randomIndex];
  }

  getGenres(): any[] {
    return this.genres;
  }
  getHorrorMovies(): Observable<any> {
    const horrorGenreId = 27;
    return this.getMoviesByGenre(horrorGenreId);
  }

  getActionMovies(): Observable<any> {
    const actionGenreId = 28;
    return this.getMoviesByGenre(actionGenreId);
  }

  getDocumentaries(): Observable<any> {
    const documentaryGenreId = 99;
    return this.getMoviesByGenre(documentaryGenreId);
  }
  getNetflixOriginals(): Observable<any> {
    return this.http.get(`${this.apiUrl}/discover/tv?with_networks=213&api_key=${this.apiKey}`);
  }
}
