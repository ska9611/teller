import React, { useState } from "react";
import Paging from "../components/Paging";
import { dummy } from "../content/bookDummy";
import searchlogo from "../assets/top_search.gif";

export default function Search() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalItemsCount = dummy.results.length;

  const handleSearch = () => {
    // 검색어를 포함하는 결과만 필터링
    const results = dummy.results.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredResults(results);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const allResults = dummy.results;

  return (
    <div>
      <div className="guide_line">
        <div className="search_head_con">
          <span className="type_query_wp">
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* 위 div스타일은 검색창과 돋보기버튼을 보기좋게 정렬 */}
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                style={{
                  textAlign: "center",
                }}
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleSearch}
                style={{
                  width: "60px",
                  height: "50px",
                  border: "2px solid #bbb",
                  borderRadius: "8px",
                  alignItems: "center", // 세로 중앙 정렬
                  justifyContent: "center", // 가로 중앙 정렬
                }}>
                <img
                  className="search-logo"
                  src={searchlogo}
                  alt="search logo"
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </button>
            </div>
          </span>
        </div>
        <ul>
          {(searchTerm === "" ? allResults : filteredResults)
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item) => (
              <li key={item.itemId}>
                <div className="li_wrap">
                  <div className="search-container">
                    <div
                      className="book-img"
                      style={{ width: "150px", marginLeft: "15px" }}>
                      <img src={item.cover} alt={item.title} />
                    </div>
                    <div className="dl-text">
                      <dl
                        style={{
                          lineHeight: "1.5",
                          fontWeight: "bold",
                          marginLeft: "35px",
                        }}>
                        <dt>{item.title}</dt>
                        <dd>{item.author}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <div className="paging">
          <Paging
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItemsCount={
              (searchTerm === "" ? allResults : filteredResults).length
            }
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <div className="footer_right">
        © 2024 Tale:er <br />이 사이트는 react를 이용하여 제작하였습니다.
      </div>
    </div>
  );
}
