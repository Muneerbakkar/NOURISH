import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/layout/Layout';

// Pages
import { Home } from './pages/Home/Home';
import { LoginPage } from './pages/Auth/LoginPage';
import { SubscribePage } from './pages/Subscribe/SubscribePage';
import { CartPage } from './pages/Cart/CartPage';
import { CartCheckout } from './pages/Cart/CartCheckout';
import { MenuPage } from './pages/Menu/MenuPage';
import { CategoryProducts } from './pages/Menu/CategoryProducts';
import { ProductDetails } from './pages/Menu/ProductDetails';
import { ProfilePage } from './pages/Profile/Profile';
import { NotificationsPage } from './pages/Profile/NotificationsPage';
import { CheckoutDetails } from './pages/Subscribe/Checkout';
import { PrivacyPolicy, TermsAndConditions, ReturnRefundPolicy } from './pages/Legal/Legal';

// Other components acting as pages
import { AboutUs, ContactUs } from './components/sections/Sections';
import { SubscriptionPlan, PlanMenu, MealDetails, MenuExplorer } from './components/subscription/Subscription';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:categoryId" element={<CategoryProducts />} />
          <Route path="/menu/:categoryId/:productId" element={<ProductDetails />} />
          <Route path="/menus" element={<MenuExplorer />} />
          <Route path="/subscribe" element={<SubscribePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart/checkout" element={<CartCheckout />} />
          <Route path="/checkout/:planId/:durationId" element={<CheckoutDetails />} />
          <Route path="/plan/:planId" element={<SubscriptionPlan />} />
          <Route path="/plan/:planId/menu/:durationId" element={<PlanMenu />} />
          <Route path="/plan/:planId/menu/:durationId/meal/:dayId/:mealType" element={<MealDetails />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<ReturnRefundPolicy />} />
        </Routes>
      </Layout>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#059669',
            color: '#fff',
            fontWeight: 'bold',
          },
          success: {
            iconTheme: {
              primary: '#fff',
              secondary: '#059669',
            },
          },
        }}
      />
    </BrowserRouter>
  );
}
