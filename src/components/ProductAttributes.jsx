import { useLoaderData } from "react-router-dom";
import ListView from "./ListView";

const ProductAttributes = () => {
  const { attributeData } = useLoaderData();
  const data = attributeData.map((i) => {
    const { id, name } = i;
    return {
      id, name
    }
  })
  return <div className="p-4">
    <ListView data={data} leftContainerTitle={'Selected Attributes'} rightContainerTitle={'Available Attributes'} size={'w-60 h-64'} title={'attributes'} />
  </div>
}
export default ProductAttributes