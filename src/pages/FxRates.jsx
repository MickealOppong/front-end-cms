import { useSelector } from "react-redux";
import { Form, useLoaderData } from "react-router-dom";
import { SingleRate } from "../components";
import { customFetch } from "../util";
const currencyQuery = (id, from, to, token) => {
  return {
    queryKey: ['currency', id, from, to],
    queryFn: () => customFetch.get(`api/currency/rates`, {
      params: {
        id, from, to
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
export const loader = (store, queryClient) => async ({ request, params }) => {
  const token = store.getState().userState.token;
  const { from, to } = Object.fromEntries([...new URL(request.url).searchParams.entries()]);

  const { id } = params
  const defaultFromDate = '2024-01-01'
  const defaultToDate = '2054-01-01'
  console.log(from, to);
  const query = currencyQuery(id, from ?? defaultFromDate, to ?? defaultToDate, token)
  const response = await queryClient.fetchQuery(query)
  const rates = response.data;
  return { rates }

}
const FxRates = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const { rates } = useLoaderData();
  //console.log(rates);
  const token = useSelector((state) => state.userState.token)


  return <section className={`mt-24 lg:mt-8 w-full max-w-6xl mx-auto px-8 h-[100vh]`
  }>
    <div className="text-black font-semibold uppercase mb-8 max-w-3xl mx-auto tracking-wider">
      <h2>Forex rate</h2>
    </div>
    <div className="bg-white w-[85vw] max-w-3xl mx-auto h-[50vh] p-2">
      <Form className="grid md:flex  md:gap-x-4 items-center gap-4 uppercase text-xs ">
        <div className="flex px-2 text-slate-600 ">
          <span className="w-full md:w-12">From</span>
          <input type="date" name="from" className="border-[1px] rounded-md h-10 w-[15rem] md:w-24" defaultValue={'2024-01-01'} />
        </div>
        <div className="flex gap-x-2 text-slate-600 ">
          <span className="w-full ml-2 md:w-12">to</span>
          <input type="date" name="to" className="border-[1px] rounded-md h-10 w-[16rem] md:w-24 mr-2" defaultValue={'2024-12-31'} />
        </div>
        <div className="flex justify-end">
          <button className="border-2 rounded-md border-cyan-700 h-9 hover:bg-primary hover:text-gray-200 w-[9rem] mr-3">
            execute
          </button>
        </div>
      </Form>
      <div className="flex p-4 text-sm uppercase text-slate-600 mt-10">
        <div className="w-[11rem] md:w-60 lg:w-96">
          <p>Date</p>
        </div>
        <div className="w-[7rem] md:w-60 lg:w-96">
          <p className="-ml-4">rate</p>
        </div>
        <div>
          <p className="-ml-4">remove</p>
        </div>
      </div>
      <div className="flex flex-col">
        {
          rates.map((rate) => {
            return <div key={rate.recId} className="border-t-[1px] last:border-b-[1px] p-2 text-slate-600 ">
              <SingleRate {...rate} />
            </div>
          })
        }
      </div>
    </div>
  </section>
}
export default FxRates