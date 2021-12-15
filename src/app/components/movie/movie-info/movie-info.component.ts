// tslint:disable-next-line: quotemark
import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MNMovie } from "./MNMovie";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-movie-info",
  templateUrl: "./movie-info.component.html",
  styleUrls: ["./movie-info.component.css"],
})
export class MovieInfoComponent implements OnInit {
  @Input() movie: any;

  @Input() cast: any;

  _streamSrc: MNMovie;
  _listSrc: MNMovie[];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.getStreamInfo().subscribe((data: any) => {
      if (data) {
        this._listSrc = data.movies;

        if (this._listSrc) {
          const movie = this._listSrc.find(
            // tslint:disable-next-line: triple-equals
            (m: MNMovie) => m.id == this.movie.id
          );
          if (movie) {
            this._streamSrc = movie;
            if (this._streamSrc) {
              this._streamSrc.safeUrl =
                this.sanitizer.bypassSecurityTrustResourceUrl(movie.srcUrl);
            }
          }
        }
      }
    });
  }

  ngOnInit() {}

  getStreamInfo() {
    return this.http.get("assets/movies.json").pipe();
  }
}
