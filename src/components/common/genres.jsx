import React, { Component } from "react";
import PropTypes from "prop-types";

const Genres = props => {
  const { listItems, selectedItem, onHandleListItem } = props;
  console.log("props ", selectedItem.name);

  return (
    <ul className="list-group">
      {listItems.map(listItem => (
        <li
          key={listItem._id}
          style={{ cursor: "pointer" }}
          onClick={() => onHandleListItem(listItem)}
          className={
            selectedItem._id === listItem._id
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {listItem.name}
        </li>
      ))}
    </ul>
  );
};

export default Genres;
Genres.propTypes = {
  listItems: PropTypes.array.isRequired,
  selectedItem: PropTypes.object.isRequired,
  onHandleListItem: PropTypes.func.isRequired
};
