import React, { Component } from "react";
import Like from "./common/like";

const MoviesTable = props => {
  const { movies } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th
            onClick={() => {
              props.onSort("title");
            }}
          >
            Title
          </th>
          <th
            onClick={() => {
              props.onSort("genre.name");
            }}
          >
            Genre
          </th>
          <th
            onClick={() => {
              props.onSort("numberInStock");
            }}
          >
            Stock
          </th>
          <th
            onClick={() => {
              props.onSort("dailyRentalRate");
            }}
          >
            Rate
          </th>
          <th>Favourite</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like
                liked={movie.liked}
                onClick={() => {
                  props.onLike(movie);
                }}
              />
            </td>
            <td>
              <button
                onClick={() => {
                  props.onDelete(movie);
                }}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
