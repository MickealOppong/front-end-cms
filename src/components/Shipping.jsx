import { useState } from "react";

const array = ['free', 'standard', 'preferential']
const isSelected = [true, false, false];
const Shipping = () => {
  const [selected, setSelected] = useState('free')
  console.log(selected);
  return <div className="flex flex-col gap-y-8 89">
    <div className="mt-10">
      <h2>Shipping options</h2>
    </div>
    <div className="flex  gap-x-4">
      <span className="w-36">Download</span>
      <input type="checkbox" name='downloadable' className="radio checkbox-primary" />
    </div>
    <div className="flex  gap-x-4">
      <span className="w-36">physical</span>
      <input type="checkbox" name='physical delivery' className="radio checkbox-primary" />
    </div>
  </div >
}
export default Shipping