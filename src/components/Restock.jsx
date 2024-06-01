
const Restock = () => {
  return <div className="flex flex-col pl-8 pt-2">
    <label className="form-control w-full max-w-xs gap-y-4">
      <div className="flex flex-col gap-y-4">
        <span className="label-text">Re-order level</span>
        <span className="label-text-alt text-c4">Please indicate the quantity at which a new order must be placed to replenish stock</span>
      </div>
      <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
    </label>
    <label className="form-control w-full max-w-xs gap-y-4 mt-4">
      <div className="flex flex-col gap-y-4">
        <span className="label-text">Re-order quantity</span>
        <span className="label-text-alt text-c4">Please indicate the quantity that must be ordered when re-order level is attained</span>
      </div>
      <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
    </label>
  </div>
}
export default Restock