import { useLoaderData } from "react-router-dom";
import SingleAttribute from "./SingleAttribute";

const AttributesContainer = () => {
  const { attributes } = useLoaderData();
  return <div className="h-[50vh]">
    <div className="flex justify-between w-full text-slate-600 uppercase font-semibold  p-4 text-xs border-b-[1px]">
      <p className="w-56">Attribute</p>
      <p className="hidden lg:flex w-[30vw]">value</p>
      <p className="mr-8">action</p>
    </div>
    <div>
      <SingleAttribute attributes={attributes} />
    </div>

  </div>
}
export default AttributesContainer