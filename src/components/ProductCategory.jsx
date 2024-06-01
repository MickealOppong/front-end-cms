import { useLoaderData } from "react-router-dom";
import ListView from "./ListView";

const ProductCategory = () => {
  const { categoryData } = useLoaderData();
  const data = categoryData.map((i) => {
    const { id, name } = i;
    return {
      id, name
    }
  })
  return <div className="p-4">
    <ListView data={data} leftContainerTitle={'Selected Categories'} rightContainerTitle={'Available Categories'} size={'w-60 h-64'} title={'categories'} />
  </div>
}
export default ProductCategory