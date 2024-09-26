import { createBrowserRouter, RouterProvider,useParams } from 'react-router-dom';
import SignupForm from '../frontend/components/Signup';
import LoginForm from '../frontend/components/Login';
import RentForm from '../frontend/components/RentForm.jsx';
import FilterForm from '../frontend/components/FilterForm.jsx';
import Category from '../frontend/components/CategoryPage.jsx';
import MainLayout from '../frontend/components/MainLayout.jsx';
import ProductbookingPage from '../frontend/components/ProductbookingPage.jsx';
import NotFound from '../frontend/components/NotFoundPage.jsx';
import NoAccessPage from '../frontend/components/NoAccessPage.jsx';
import ProductPage from '../frontend/components/ProductPage.jsx';




import Managers from "../frontend/components/Admindashboard/Managerslist.jsx"
import ManagerDefault from '../frontend/components/Managerdashboard/ManagerDefault.jsx';

import ManagerPage from "../frontend/components/ManagerPage.jsx"
import ManagerBookings from "../frontend/components/Managerdashboard/ManagerBookings.jsx";
import ManagerCategory from "../frontend/components/Managerdashboard/ManagerCategory.jsx";
import ManagerRevenue from "../frontend/components/Managerdashboard/ManagerRevenue.jsx";
import ManagerUploads from "../frontend/components/Managerdashboard/ManagerUploads.jsx";
import AdminPage from '../frontend/components/AdminPage.jsx';
import Adminusers from '../frontend/components/Admindashboard/Users';
import AdminBookings from '../frontend/components/Admindashboard/AdminBookings.jsx';
import AdminRevenue from '../frontend/components/Admindashboard/AdminRevenue.jsx';
import AdminUploads from '../frontend/components/Admindashboard/AdminUploads.jsx';
import AdminCategory from '../frontend/components/Admindashboard/AdminCategory.jsx';
import WelcomeAdmin from "../frontend/components/Admindashboard/AdminWelcome.jsx"
import AddLocation from '../frontend/components/Admindashboard/AddBranch.jsx';

import AccountProfile from '../frontend/components/Userdashboard/AccountProfile.jsx';
import AccountDetails from '../frontend/components/Userdashboard/AccountDetails.jsx';
import YourBookings from '../frontend/components/Userdashboard/YourBookings.jsx';
import YourRentals from "../frontend/components/Userdashboard/YourRentals.jsx";
import AccountSettings from '../frontend/components/Userdashboard/AccountSettings.jsx';
import AccountNotifications from '../frontend/components/Userdashboard/AccountsNotifications.jsx';
import ManagerNotifications from '../frontend/components/Managerdashboard/ManagerNotifications.jsx';

import '../frontend/css/App.css';
import FAQPage from '../frontend/components/FAQPage.jsx'
import About from '../frontend/components/About.jsx';

const allowedCategories = ['bikes', 'cars', 'cameras', 'drones','speakers','fishingrods','cycles'];

const CategoryWrapper = () => {
  const { category } = useParams();

 
  if (allowedCategories.includes(category)) {
    return <Category />;
  }
  else{
  return <NotFound/>;
  }
};


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element:<MainLayout/>,   
    children:[
    {
      path: '/FilterForm',
      element: (
          <FilterForm />
      ),
    },
    {
      path: '/category/:category',
      element: (
          <CategoryWrapper/>
      ),
    },
    {
      path:'/products/:product_id',
      element:(<ProductPage/>),
    },
    {
      path:'/productbooking/:product_id',
      element:(
         <ProductbookingPage/>
      ),
    },
  ]}
  ,
  {
    path: '/login',
    element: (
        <LoginForm />
    ),
  },
  {
    path: '/Signup',
    element: (
        <SignupForm/>
    ),
  },
  {
    path: '/RentForm',
    element: (
        <RentForm />
    ),
  },
  {
    path:'/adminpage',
    element:<AdminPage/>,
    children:[
      {
        path:"/adminpage",
        element:<WelcomeAdmin/>
      },
      {
        path:'users',
        element:<Adminusers/>,
      },
      {
        path:"/adminpage/bookings",
        element:<AdminBookings/>
      },
      {
        path:"/adminpage/revenue",
        element:<AdminRevenue/>
      },
      {
        path:"/adminpage/uploads",
        element:<AdminUploads/>
      },
      {
        path:"/adminpage/availCategories",
        element:<AdminCategory/>
      },
      {
        path:"/adminpage/managers",
        element:<Managers/>
      },
      {
        path:"/adminpage/addLocation",
        element:<AddLocation/>
      },
    ],
  },
  {
    path:'/managerPage',
    element:<ManagerPage/>,
    children:[
      {
        path:"/managerPage",
        element:<ManagerDefault/>
      },
      {
        path:"/managerPage/notifications",
        element:<ManagerNotifications/>
      },
      {
        path:"/managerPage/bookings",
        element:<ManagerBookings/>
      },
      {
        path:"/managerPage/revenue",
        element:<ManagerRevenue/>
      },
      {
        path:"/managerPage/uploads",
        element:<ManagerUploads/>
      },
      {
        path:"/managerPage/availCategories",
        element:<ManagerCategory/>
      },
    ],
  },
  {
    path:"/accountProfile",
    element:(
      <AccountProfile/>
    ),
    children:[
      {
        path:"/accountProfile",
        element:(
          <AccountDetails/>
        )
    },
      {
          path:"/accountProfile/details",
          element:(
            <AccountDetails/>
          )
      },
      {
        path:"/accountProfile/bookings",
        element:(
          <YourBookings/>
        )
      },
      {
        path:"/accountProfile/rentals",
        element:(
          <YourRentals/>
        )
      },
      {
        path:"/accountProfile/settings",
        element:(
          <AccountSettings/>
        )
      },
      {
        path:"/accountProfile/notifications",
        element:(<AccountNotifications/>)
      }
    ]
  },
  {
    path: '/faq',
    element: <FAQPage/>,
  },
  {
    path:'/about',
    element:<About/>
  },
  {
    path:'*',
    element:(
      <NotFound/>
    )
  },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

