import { CiEdit } from "react-icons/ci"
import { RiDeleteBin5Line } from "react-icons/ri"

const EditSKU = ({ readOnly, description, skuValue, handleDelete, handleEdit }) => {

  return <>
    <div className="grid grid-cols-2 p-2 gap-y-2 text-xs">
      <input name={'description'} placeholder="description" className={`capitalize outline-none w-60 ${readOnly ? '' : 'border-2 p-2 rounded-md'}`} defaultValue={description} readOnly={readOnly} />
      <input name={'value'} placeholder="value" className={`capitalize outline-none w-60 ${readOnly ? '' : 'border-2 p-2 rounded-md'}`} defaultValue={skuValue} readOnly={readOnly} />
    </div>
    <div className="mt-2 flex gap-x-4 w-full">
      <button onClick={handleEdit}><CiEdit /></button>
      <button onClick={handleDelete}><RiDeleteBin5Line /></button>
      <button>save</button>
    </div>
  </>

}
export default EditSKU