import { useLoaderData } from "react-router-dom";
import SingleCurrency from './SingleCurrency';
const CurrencyContainer = () => {
  const { currencyList } = useLoaderData();

  return <div>
    <div className="flex  text-slate-600 uppercase text-sm -ml-2 p-4">
      <p className="w-96 md:w-96 lg:w-96">Currency</p>
      <p className="hidden md:flex md:w-80 lg:w-56">iso</p>
      <p className="hidden lg:flex md:w-36 lg:w-56 ">created at</p>
      <p className="md:ml-20">action</p>
    </div>
    <div>
      {
        currencyList.map((currency) => {
          return <div key={currency.recId} className="border-t-[1px] last:border-b-[1px] p-2">
            <SingleCurrency {...currency} />
          </div>

        })
      }
    </div>

  </div>
}
export default CurrencyContainer