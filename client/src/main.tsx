import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Providers from './components/common/Providers';
import store from '@/redux/store';
import ModalProvider from '@/contexts/modal/ModalProvider';
import '@/styles/animation.css';
import '@/styles/global.css';
import '@/styles/index.css';
import FootPrintPage from './pages/FootPrintPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import MyRecordPage from './pages/MyRecordPage';
import MyTripPage from './pages/MyTripPage';
import NotFound from './pages/NotFound';
import PlanDetailPage from './pages/PlanDetailPage';
import PlanMapPage from './pages/PlanMapPage';
import PlanPage from './pages/PlanPage';
import SignUpPage from './pages/SignUpPage';
import Bookmark from './pages/Bookmark';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SignOutPage from './pages/SignOutPage';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'signout', element: <SignOutPage /> },
      { path: 'login/password', element: <ResetPasswordPage /> },
      { path: 'plan', element: <PlanPage /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'mypage/mytrip', element: <MyTripPage /> },
      { path: 'mypage/myrecord', element: <MyRecordPage /> },
      { path: 'mypage/footprint', element: <FootPrintPage /> },
    ],
  },
  { path: 'plan/map', element: <PlanMapPage /> },
  { path: 'plan/detail', element: <PlanDetailPage /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Providers>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </Providers>
  </Provider>
);
