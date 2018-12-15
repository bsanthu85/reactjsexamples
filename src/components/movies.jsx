import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { populatePagination } from "../utils/pagination";
import Genre from "./common/genres";
import MoviesTable from "./moviestable";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    genres: getGenres(),
    selectedGenre: { _id: "all", name: "All Genres" },
    sortColumn: { path: "title", order: "asc" }
  };

  constructor() {
    super();
    this.state.genres = [this.state.selectedGenre, ...this.state.genres];
    console.log("first item", this.state.genres[0]._id);
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(mov => mov._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    console.log("like ", movie.liked);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    const mov = { ...movies[index] };
    movies[index] = mov;

    if (mov.liked) {
      mov.liked = false;
    } else {
      mov.liked = true;
    }
    this.setState({ movies });
  };

  handlePageChange = page => {
    console.log(`${page} page clicked`);
    this.setState({ currentPage: page });
  };

  handleListItem = listItem => {
    console.log("selected ", listItem.name);
    this.setState({ selectedGenre: listItem });
    const movies = getMovies();
    if (listItem._id !== "all") {
      const filteredMovies = movies.filter(
        movie => movie.genre.name === listItem.name
      );
      this.setState({ movies: filteredMovies });
      return;
    }
    console.log("movies ", movies.length);
    this.setState({ movies });
  };

  handleSort = path => {
    console.log(path);
    const sortColumn = { ...this.state.sortColumn };
    if ((sortColumn.path = path))
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };

  render() {
    const { length: counter } = this.state.movies;
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      genres: allGenres,
      selectedGenre,
      sortColumn
    } = this.state;
    const likes = allMovies.filter(movie => movie.liked).length;

    const sorted = _.orderBy(allMovies, [sortColumn.path], [sortColumn.order]);

    const movies = populatePagination(sorted, currentPage, pageSize);

    //if (counter === 0) return <p>There are no movies in the database</p>;
    return (
      <React.Fragment>
        <p>
          Showing {counter} movies from the database; Likes {likes}
        </p>
        <div className="row">
          <div className="col-2">
            <Genre
              listItems={allGenres}
              selectedItem={selectedGenre}
              onHandleListItem={this.handleListItem}
            />
          </div>
          <div className="col-4">
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={counter}
              onClick={this.handlePageChange}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
