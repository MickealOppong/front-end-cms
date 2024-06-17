import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import SingleProduct from "./SingleProduct";


const ProductsContainer = () => {
  const { products } = useLoaderData();
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)

  return <div className={`grid md:grid-cols-2 gap-6 ${showSidebar ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
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