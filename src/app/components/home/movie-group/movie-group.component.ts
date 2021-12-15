import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-movie-group",
  templateUrl: "./movie-group.component.html",
  styleUrls: ["./movie-group.component.css"],
})
export class MovieGroupComponent implements OnInit {
  @Input() movieGroupTitle: string;
  @Input() movies: any[];
  sliceSize = 4;
  isStreamMovie = false;

  constructor() {}

  ngOnInit() {
    // tslint:disable-next-line: triple-equals
    if (this.movieGroupTitle == "Available to stream") {
      this.isStreamMovie = true;
    } else {
      this.isStreamMovie = false;
    }
  }

  loadMoreClicked() {
    this.sliceSize += 8;
  }
}
