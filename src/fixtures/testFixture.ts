import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { PaymentPage } from "../pages/PaymentPage";
import { ContactUsPage } from "../pages/ContactUsPage";

type Pages = {
  home: HomePage;
  login: LoginPage;
  signup: SignupPage;
  products: ProductsPage;
  cart: CartPage;
  checkout: CheckoutPage;
  payment: PaymentPage;
  contact: ContactUsPage;
};

export const test = base.extend<Pages>({
  home: async ({ page }, use) => await use(new HomePage(page)),
  login: async ({ page }, use) => await use(new LoginPage(page)),
  signup: async ({ page }, use) => await use(new SignupPage(page)),
  products: async ({ page }, use) => await use(new ProductsPage(page)),
  cart: async ({ page }, use) => await use(new CartPage(page)),
  checkout: async ({ page }, use) => await use(new CheckoutPage(page)),
  payment: async ({ page }, use) => await use(new PaymentPage(page)),
  contact: async ({ page }, use) => await use(new ContactUsPage(page)),
});

export { expect } from "@playwright/test";
