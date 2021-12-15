import { MNMovie } from "./../movie/movie-info/MNMovie";
import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../../services/movies.service";
import { HttpClient } from "@angular/common/http";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  loading: boolean;

  popularMovies: any[];
  popularKidsMovies: any[];
  upcomingMovies: any[];
  nowPlayingMovies: any[];
  _availableMovies: MNMovie[];
  streamAvailMovies: any[];

  constructor(public _ms: MoviesService, private http: HttpClient) {
    this.loading = true;
  }

  ngOnInit() {
    this.getAvailableMovies();
    this.getPopularMovies();
    this.getPopularKidsMovies();
    this.getUpcomingMovies();
    this.getNowPlayingMovies();
  }

  getAvailableMovies() {
    // tslint:disable-next-line: quotemark
    this.http.get("assets/movies.json").subscribe((data: any) => {
      this._availableMovies = data.movies;
      if (this._availableMovies) {
        const calls = [];
        // tslint:disable-next-line: forin
        this._availableMovies.forEach((v) => {
          calls.push(this._ms.getMovie(v.id as unknown as number));
        });

        forkJoin(calls).subscribe((res) => {
          this.streamAvailMovies = res;
          this.loading = false;
        });
      }
    });
  }

  getPopularMovies() {
    this._ms.getPopularMovies().subscribe((data) => {
      this.popularMovies = data;
      this.loading = false;
    });
  }

  getPopularKidsMovies() {
    this._ms.getPopularKidsMovies().subscribe((data) => {
      this.popularKidsMovies = data;
      this.loading = false;
    });
  }

  getUpcomingMovies() {
    this._ms.getUpcomingMovies().subscribe((data) => {
      this.upcomingMovies = data;
      this.loading = false;
    });
  }

  getNowPlayingMovies() {
    this._ms.getNowPlayingMovies().subscribe((data) => {
      this.nowPlayingMovies = data;
      this.loading = false;
    });
  }
}
