import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  let { pageSize, itemsCount, currentPage, onClick } = props;
  let pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) {
    return null;
  }

  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onClick(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};
