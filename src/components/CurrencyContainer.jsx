import { useLoaderData } from "react-router-dom";
import SingleCurrency from './SingleCurrency';
const CurrencyContainer = () => {
  const { currencyList } = useLoaderData();

  return <div>
    <div className="flex w-full text-slate-600 uppercase text-sm -ml-2 p-4">
      <p className="w-96 ">Currency</p>
      <p className="w-56 ">iso</p>
      <p className="w-56">created at</p>
      <p className="">action</p>
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