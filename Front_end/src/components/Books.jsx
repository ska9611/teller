import React from "react";
import { useNavigate } from "react-router-dom";

export default function Movie(props) {
  const navigate = useNavigate();

  const onclickMovieItem = () => {
    navigate(`/BookDetails/${props.isbn}`, {
      // 오늘의 테일에서 책 이미지 클릭시 이동하는 url 경로
      state: props,
    });
    // 최근 클릭한 책 목록 업데이트
    updateRecentBooks(props);
  };

  return (
    <div className="books-container" onClick={onclickMovieItem}>
      <img src={props.image_url} alt="오늘의 테일 책이미지 " />
      <div className="book-info">
        <h4>{props.title}</h4>
        <span>{props.costomerReviewRank}</span>
      </div>
    </div>
  );
}
