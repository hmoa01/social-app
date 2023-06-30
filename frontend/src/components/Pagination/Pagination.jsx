import React, { useEffect } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { count } = useSelector((state) => state.storePosts);

  let page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;

  let limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit"))
    : 9;

  useEffect(() => {
    handleSearchParams(page);
  }, [searchParams]);

  const handleSearchParams = (page) => setSearchParams({ page, limit });

  const handleCurrentPage = (e) => {
    handleSearchParams(e.target.name);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      handleSearchParams(page - 1);
    }
  };

  const pagesOfPagination = () => {
    let numOfPage = Math.ceil(count / limit);
    return Array(numOfPage)
      .fill(1)
      .map((el, index) => (
        <button
          onClick={handleCurrentPage}
          key={index}
          name={el + index}
          className={`${
            page === el + index ? "bg-primary text-white" : null
          } text-md w-8 rounded-full border border-gray-500 text-gray-500`}
        >
          {el + index}
        </button>
      ));
  };

  const handleNextPage = () => {
    if (page < Math.ceil(count / limit)) {
      handleSearchParams(page + 1);
    }
  };

  return (
    <div className="flex gap-1 items-center justify-center w-[490px] h-[60px] m-auto rounded-md p-2 border border-primary mt-[30px]">
      <BsArrowLeftCircle
        className="w-[30px] h-[30px] bg-transparent text-gray-500"
        onClick={handlePreviousPage}
      />

      {pagesOfPagination()}

      <BsArrowRightCircle
        className="w-[30px] h-[30px] bg-transparent text-gray-500 "
        onClick={handleNextPage}
      />
    </div>
  );
};

export default Pagination;
