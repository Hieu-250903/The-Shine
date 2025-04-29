import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React from "react";

const Pagination = ({ current = 3, total = 50, onChange }) => {
  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show page 1 and 2 if we're at the beginning
    if (current <= 3) {
      pageNumbers.push(1, 2, 3);
      pageNumbers.push("...");
      pageNumbers.push(total - 1, total);
    }
    // Always show the last 2 pages if we're at the end
    else if (current >= total - 2) {
      pageNumbers.push(1, 2);
      pageNumbers.push("...");
      pageNumbers.push(total - 2, total - 1, total);
    }
    // Show current page with neighbors, and first/last pages with ellipsis
    else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      pageNumbers.push(current - 1, current, current + 1);
      pageNumbers.push("...");
      pageNumbers.push(total);
    }

    return pageNumbers;
  };

  const handleClick = (page) => {
    if (typeof page === "number" && onChange) {
      onChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center w-full bg-transparent py-3">
      <button
        className="w-8 h-8 flex items-center justify-center bg-teal-600 text-white rounded mr-1"
        onClick={() => handleClick(Math.max(1, current - 1))}
      >
        <LeftOutlined className="text-xs" />
      </button>

      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <div className="w-8 h-8 flex items-center justify-center text-white">
              {page}
            </div>
          ) : (
            <button
              className={`w-8 h-8 flex items-center justify-center text-xs rounded mr-1 ${
                page === current
                  ? "bg-teal-600 text-white font-medium"
                  : "bg-teal-600 text-white"
              }`}
              onClick={() => handleClick(page)}
            >
              {page.toString().padStart(2, "0")}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        className="w-8 h-8 flex items-center justify-center bg-teal-600 text-white rounded ml-1"
        onClick={() => handleClick(Math.min(total, current + 1))}
      >
        <RightOutlined className="text-xs" />
      </button>
    </div>
  );
};
export default Pagination;
