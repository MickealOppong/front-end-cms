import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  const { pageCount, size, totalElements, page } = useLoaderData()


  const navigate = useNavigate()
  const { search, pathname } = useLocation();
  //console.log(pageCount, size, totalElements, page);

  const array = Array.from(({ length: pageCount }), (_, index) => {
    return index;
  })

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  if (pageCount < 2) return
  return <div className="flex items-center justify-end w-full
   mt-10">
    <button className="bg-c4 h-8 w-12 p-2 mr-1 text-slate-200 rounded-md uppercase text-xs " onClick={() => {
      let prevPage = page - 1;
      if (prevPage < 0) {
        prevPage = pageCount - 1;
      }
      handlePageChange(prevPage)
    }}>prev</button>
    {
      array.map((pageNumber) => {
        return <button className={`h-8 w-[3rem] p-2 text-slate-200 rounded-md uppercase mr-1 text-xs ${pageNumber === page ? 'bg-c3' : 'bg-c4'} w-16`} key={pageNumber} onClick={() => handlePageChange(pageNumber)}>{pageNumber + 1}</button>
      })
    }
    <button className="bg-c4 h-8 w-12 p-2 text-xs text-slate-200 rounded-md uppercase " onClick={() => {
      let nextPage = page + 1;
      if (nextPage > pageCount - 1) {
        nextPage = 0;
      }
      handlePageChange(nextPage)
    }}>next</button>
  </div>
}

export default PaginationContainer