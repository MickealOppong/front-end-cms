import { FormInput } from "../components/index"

const CreateVendor = () => {
  return <div className="flex flex-col ">
    <FormInput name='vendorName' type='text' size='w-80' placeholder={'Vendor name'} />
    <FormInput name='vendorAddress' type='text' size='w-80' placeholder={'Address'} />
    <FormInput name='vendorTelephone' type='text' size='w-80' placeholder={'Telephone'} />
    <FormInput name='vendorEmail' type='email' size='w-80' placeholder={'Email'} />
  </div>
}
export default CreateVendor