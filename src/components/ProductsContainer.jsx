import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import SingleProduct from "./SingleProduct";


const ProductsContainer = () => {
  const { products } = useLoaderData();
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  return <div className={` gap-x-2 ${showSidebar ? 'grid lg:grid-cols-3 ' : 'grid md:grid-cols-2 lg:grid-cols-4'}`}>
    {
      products.map((product) => {
        return <div className="flex mt-4" key={product.id}>
          <SingleProduct {...product} />
        </div>

      })
    }
  </div>

}
export default ProductsContainer