const CategoryTitle = () => {

  return <article className="flex p-4 text-slate-600 w-[100vw]  rounded-xl uppercase text-xs ">
    {/**NAME */}
    <div className="flex w-60">
      <p >Category</p>
    </div>
    {/**DESCRIPTION */}
    <div className="hidden md:flex w-96">
      <p >description</p>
    </div>
    {/**QUANTITY */}
    <div className="hidden lg:flex w-36">
      <p >quantity</p>
    </div>
    {/**SALE */}
    <div className="hidden lg:flex  w-36">
      <p >sale</p>
    </div>
    {/**CREATE AT */}
    <div className="hidden lg:flex w-56 ">
      <p className="">created at</p>
    </div>
    {/**ACTIONS */}
    <div className="flex ">
      <p className="lg:ml-28" >actions</p>
    </div>
  </article >
}
export default CategoryTitle;