import React from "react";
import { useLoaderData } from "react-router-dom";

export default function BookDetails() {
  const booksData = useLoaderData();

  //수정중인부분
  //	const bookdata = booksData[0];

  return (
    <div className="page-container">
      <div className="page-wrapper">
        <img
          className="detail-img"
          style={{
            width: "320px",
            height: "450px",
            margin: "25px 45px",
            display: "flex",
            borderRadius: "15px",
            boxShadow: "3px 5px 8px black",
            minWidth: "250px",
          }}
          src={booksData.image_url}
          alt="책 이미지"
        />
        <p
          style={{
            display: "flex",
            fontSize: "32px",
            margin: "25px",
            padding: "10px",
            fontWeight: "bold",
            minWidth: "450px",
          }}>
          {booksData.title}
          <br />
          <br />
        </p>
        <p
          style={{
            display: "flex",
            fontSize: "25px",
            fontWeight: "bold",
            paddingBottom: "10px",
          }}>
          {booksData.author}
        </p>
      </div>

      <div>
        <div
          style={{
            fontSize: "18px",
            margin: "25px",
            padding: "10px",
            lineHeight: "150%",
            minWidth: "300px",
          }}>
          {booksData.description}
        </div>
      </div>

      <hr className="black-line" />
      {/* 여기서부터 아랫 바뀜줄 컨테이너 */}

      <div
        style={{
          display: "flex",
          margin: "50px 50px",
          fontWeight: "bold",
          fontSize: "28px",
        }}>
        도서 상세정보
      </div>
      <div
        style={{
          display: "flex",
          minWidth: "300px",
          margin: "50px 60px",
          letterSpacing: "0.4px",
          lineHeight: "160%",
        }}>
        <p>{booksData.description}</p>
      </div>

      <div
        className="book-slidecontainer"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
        <div className="slide-wrapper">
          <div className="slide-item">
            <p>카테고리</p>
            <strong style={{ whiteSpace: "nowrap" }}>
              {booksData.categoryName}
            </strong>
          </div>
          <div className="slide-vertical-line"></div>
          <div className="slide-item">
            <p>도서가격</p>
            <h1>{booksData.priceStandard} 원 </h1>
          </div>
          <div className="slide-vertical-line"></div>
          <div className="slide-item">
            <p>책유형</p>
            <h1>{booksData.mallType}</h1>
          </div>
          <div className="slide-vertical-line"></div>
          <div className="slide-item">
            <p>출판사</p>
            <strong style={{ whiteSpace: "nowrap" }}>
              {" "}
              {booksData.publisher}
            </strong>
          </div>
          <div className="slide-vertical-line"></div>
          <div className="slide-item">
            <p>종이책 출간일</p>
            <h1>{booksData.pubDate}</h1>
          </div>
          <div className="slide-vertical-line"></div>
          <div className="slide-item">
            <p>평점</p>
            <h1>{booksData.customerReviewRank} / 10 </h1>
          </div>
          <div className="slide-vertical-line"></div>
          <div className="slide-item">
            <p>ISBN</p>
            <h1>{booksData.isbn}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const response = await fetch("http://localhost:3000/book/" + params.isbn);
  const resData = await response.json();
  return resData;
}
