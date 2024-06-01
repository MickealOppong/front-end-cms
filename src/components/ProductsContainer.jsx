import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import SingleProduct from "./SingleProduct";


const ProductsContainer = () => {
  const { products } = useLoaderData();
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  return <div className={` gap-8 ${showSidebar ? 'grid grid-cols-3' : 'grid grid-cols-4'}`}>
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