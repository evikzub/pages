import React from "react";
import { usePagination } from "../../../hooks/usePagination";

const Pagination = ({totalPages, page, changePage}) => {

  // hook instead of array
  const pagesArray = usePagination(totalPages)
  //let pagesArray = getPagesArray(totalPages)

    return (
        <div className='page__wrapper'>
            {pagesArray.map(p => 
            <span
                key={p}
                onClick={() => changePage(p)}
                className={page === p ? 'page page__current' : 'page'}>{p}</span>
            )}
        </div>
    )
}

export default Pagination