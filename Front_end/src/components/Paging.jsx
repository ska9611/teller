import React from "react";
import Pagination from "react-js-pagination";
import PropTypes from "prop-types";
import "../Paging.css";

const Paging = ({
  currentPage,
  itemsPerPage,
  totalItemsCount,
  onPageChange,
}) => {
  return (
    <Pagination
      activePage={currentPage}
      itemsCountPerPage={itemsPerPage}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={onPageChange}
    />
  );
};

Paging.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Paging;
