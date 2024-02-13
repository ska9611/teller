import React from "react";
import { useLoaderData } from "react-router-dom";
import Books from "../components/Books";
export default function BookPage() {
  const booksData = useLoaderData();

  return (
    <div>
      <div className="bookpage-container">
        {booksData.map((item) => {
          return (
            <Books
              key={item.isbn}
              title={item.title}
              author={item.author}
              pubDate={item.pubDate}
              description={item.description}
              isbn={item.isbn}
              categoryName={item.categoryName}
              publisher={item.publisher}
              customerReviewRank={item.customerReviewRank}
              image_url={item.image_url}
              itemId={item.itemId}
              priceStandard={item.priceStandard}
              mallType={item.mallType}
            />
          );
        })}
      </div>
    </div>
  );
}

export async function loader() {
  const response = await fetch("http://localhost:3000/book/main");
  const resData = await response.json();
  return resData;
  //수정부분
  // return resData.books;
}
///
