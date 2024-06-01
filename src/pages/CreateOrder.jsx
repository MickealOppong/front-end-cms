import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { customFetch } from "../util";
export const action = (store) => () => {

}
export const loader = (store) => async ({ params }) => {
  const token = store.getState().userState.token;
  const { id } = params;
  try {
    const response = await customFetch.get(`/api/products/product/${id}`, {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const singleProduct = response
      .data;
    // console.log(response);
    return {
      singleProduct
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

const CreateOrder = () => {
  const showSidebar = useSelector((state) => state.sidebarState.showSidebar)
  const { singleProduct } = useLoaderData();
  console.log(singleProduct);
  const width = () => {
    return ` ${showSidebar ? 'lg:w-[25vw]' : 'lg:w-[30vw] '}`
  }


  return <section className={`mt-8 ${showSidebar ? 'w-[80vw]' : 'w-[100vw]'} px-8 h-[150vh] `
  }>

  </section>
}

export default CreateOrder