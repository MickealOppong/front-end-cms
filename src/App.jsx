import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AddRate, AddUser, Attributes, Categories, CreateAttribute, CreateCategory, CreateCurrency, CreateOrder, CreateProduct, CreateRoles, Currencies, Dashboard, EditAttribute, EditCategory, EditProduct, EditRole, EditUser, ErrorPage, HomeLayout, Landing, Login, OrderList, Products, Register, Roles, Settings, SingleErrorPage, UserRole, Users, ViewAttribute, ViewCategory, ViewProduct, ViewRole, ViewUser } from './pages/index';
import { store } from "./store";

//actions
import { action as fxAction } from './pages/AddRate';
import { action as addUserAction } from './pages/AddUser';
import { action as attributeAction } from './pages/CreateAttribute';
import { action as createCategoryAction } from './pages/CreateCategory';
import { action as currencyAction } from './pages/CreateCurrency';
import { action as orderAction } from './pages/CreateOrder';
import { action as editAttributeAction } from './pages/EditAttribute';
import { action as editCategoryAction } from './pages/EditCategory';
import { action as editUserAction } from './pages/EditUser';
import { action as loginAction } from './pages/Login';

//loaders
import { loader as attributesLoader } from './pages/Attributes';
import { loader as categoryLoader } from './pages/Categories';

import { loader as productLoader } from './pages/CreateOrder';
import { loader as generalLoader } from './pages/CreateProduct';
import { loader as currenciesLoader } from './pages/Currencies';
import { loader as homeLoader } from './pages/Dashboard';
import { loader as editAttributeLoader } from './pages/EditAttribute';
import { loader as editCategoryLoader } from './pages/EditCategory';
import { loader as editProductLoader } from './pages/EditProduct';
import { loader as editRoleLoader } from './pages/EditRole';
import { loader as editUserLoader } from './pages/EditUser';
import FxRates, { loader as ratesLoader } from "./pages/FxRates";
import { loader as ordersLoader } from './pages/OrderList';
import { loader as productsLoader } from './pages/Products';
import { loader as rolesLoader } from './pages/Roles';
import { loader as userRoleLoader } from './pages/UserRole';
import { loader as usersLoader } from './pages/Users';
import { loader as viewAttributeLoader } from './pages/ViewAttribute';
import { loader as viewCategoryLoader } from './pages/ViewCategory';
import { loader as viewRoleLoader } from './pages/ViewRole';
import { loader as viewUserLoader } from './pages/ViewUser';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60
    }
  }
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    loader: homeLoader(store),
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: <SingleErrorPage />,
        loader: homeLoader(store)
      },
      {
        path: 'orders',
        element: <OrderList />,
        errorElement: <SingleErrorPage />,
        loader: ordersLoader(store)
      },
      {
        path: 'order/:id',
        element: <CreateOrder />,
        errorElement: <SingleErrorPage />,
        action: orderAction(store),
        loader: productLoader(store)
      },
      {
        path: 'tracking',
        element: <OrderList />,
        errorElement: <SingleErrorPage />,
      },
      {
        path: 'addUser',
        element: <AddUser />,
        errorElement: <SingleErrorPage />,
        action: addUserAction(store, queryClient),
        loader: rolesLoader(store, queryClient)
      },
      {
        path: 'users',
        element: <Users />,
        errorElement: <SingleErrorPage />,
        loader: usersLoader(store, queryClient)
      },
      {
        path: 'viewUser/:id',
        element: <ViewUser />,
        errorElement: <SingleErrorPage />,
        loader: viewUserLoader(store, queryClient)
      },
      {
        path: 'editUser/:id',
        element: <EditUser />,
        errorElement: <SingleErrorPage />,
        loader: editUserLoader(store, queryClient),
        action: editUserAction(store, queryClient)

      },
      {
        path: 'createRole',
        element: <CreateRoles />,
        errorElement: <SingleErrorPage />,
      },
      {
        path: 'roles',
        element: <Roles />,
        errorElement: <SingleErrorPage />,
        loader: rolesLoader(store, queryClient)
      },
      {
        path: 'userRole',
        element: <UserRole />,
        errorElement: <SingleErrorPage />,
        loader: userRoleLoader(store, queryClient
        )
      },
      {
        path: '/editRole/:id',
        element: <EditRole />,
        errorElement: <SingleErrorPage />,
        loader: editRoleLoader(store, queryClient)
      },
      {
        path: '/viewRole/:id',
        element: <ViewRole />,
        errorElement: <SingleErrorPage />,
        loader: viewRoleLoader(store, queryClient)
      },
      {
        path: 'settings',
        element: <Settings />,
        errorElement: <SingleErrorPage />
      },
      {
        path: 'addProduct',
        element: <CreateProduct />,
        errorElement: <SingleErrorPage />,
        loader: generalLoader(store, queryClient),
      },
      {
        path: 'products',
        element: <Products />,
        errorElement: <SingleErrorPage />,
        loader: productsLoader(store, queryClient
        )
      },
      {
        path: 'editProduct/:id',
        element: <EditProduct />,
        errorElement: <SingleErrorPage />,
        loader: editProductLoader(store, queryClient)
      },
      {
        path: 'viewProduct/:id',
        element: <ViewProduct />,
        errorElement: <SingleErrorPage />,
        loader: productLoader(store, queryClient)

      },
      {
        path: 'category',
        element: <CreateCategory />,
        errorElement: <SingleErrorPage />,
        action: createCategoryAction(store, queryClient),
      },
      {
        path: 'categories',
        element: <Categories />,
        errorElement: <SingleErrorPage />,
        loader: categoryLoader(store, queryClient)
      },
      {
        path: 'viewCategory/:id',
        element: <ViewCategory />,
        errorElement: <SingleErrorPage />,
        loader: viewCategoryLoader(store, queryClient)
      },
      {
        path: 'editCategory/:id',
        element: <EditCategory />,
        errorElement: <SingleErrorPage />,
        loader: editCategoryLoader(store, queryClient),
        action: editCategoryAction(store, queryClient)
      },
      {
        path: 'attribute',
        element: <CreateAttribute />,
        errorElement: <SingleErrorPage />,
        action: attributeAction(store, queryClient)
      }, {
        path: 'Attributes',
        element: <Attributes />,
        errorElement: <SingleErrorPage />,
        loader: attributesLoader(store, queryClient)
      },
      {
        path: 'editAttribute/:id',
        element: <EditAttribute />,
        errorElement: <SingleErrorPage />,
        loader: editAttributeLoader(store, queryClient),
        action: editAttributeAction(store, queryClient)
      }, {
        path: 'viewAttribute/:id',
        element: <ViewAttribute />,
        errorElement: <SingleErrorPage />,
        loader: viewAttributeLoader(store, queryClient)
      }, {
        path: 'currencies',
        element: <Currencies />,
        errorElement: <SingleErrorPage />,
        loader: currenciesLoader(store, queryClient)
      },
      {
        path: 'currency',
        element: <CreateCurrency />,
        errorElement: <SingleErrorPage />,
        action: currencyAction(store, queryClient)
      }, {
        path: 'addRate/:id',
        element: <AddRate />,
        errorElement: <SingleErrorPage />,
        action: fxAction(store, queryClient)
      }, {
        path: 'fxRates/:id',
        element: <FxRates />,
        errorElement: <SingleErrorPage />,
        loader: ratesLoader(store, queryClient)
      },
    ]

  },
  {
    path: 'landing',
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <ErrorPage />,
    action: loginAction(store)
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <ErrorPage />,
  }


])
const App = () => {

  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>

}
export default App;