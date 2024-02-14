import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div
        style={{
          marginTop: "60px",
          fontSize: "40px",
          fontWeight: "bold",
          marginBottom: "32px",
        }}>
        해당 페이지를 찾지 못했습니다.
      </div>
      <div
        style={{
          fontSize: "27px",
          lineHeight: "1.6",
        }}>
        주소가 잘못되었거나 더이상 제공되지 않는 페이지입니다.
      </div>
      <div>
        <button
          onClick={() => navigate("/")}
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "blue",
            cursor: "pointer",
            margin: "29px",
          }}>
          <p>home으로 이동</p>
        </button>
      </div>
    </div>
  );
}
