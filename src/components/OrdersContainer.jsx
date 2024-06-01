import SingleOrder from "./SingleOrder";


const OrdersContainer = () => {

  return <div>

    <div className="overflow-x-auto no-scrollbar">
      <div className="flex  items-center text-xs w-[100vw] p-2 uppercase">
        <div className="w-96">
          <p>Product name</p>
        </div>
        <div className="w-96">
          <p>Product description</p>
        </div>
        <div className="w-96">
          <p>product ID</p>
        </div>
        <div className="w-56">
          <p>price</p>
        </div>
        <div className="w-56">
          <p>quantity</p>
        </div>
        <div className="w-96">
          <p>sale</p>
        </div>

        <div className="w-96">
          <p>stock</p>
        </div>
        <div className="w-96">
          <p>actions</p>
        </div>
      </div>
      <div >
        <SingleOrder />
      </div>
    </div>
  </div>



}
export default OrdersContainer