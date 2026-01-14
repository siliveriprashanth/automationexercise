import { test } from "@playwright/test";
import { STORAGE_STATE } from "../src/utils/constants";
import { randomEmail } from "../src/utils/random";
import { testData } from "../src/utils/testData";
import { HomePage } from "../src/pages/HomePage";
import { LoginPage } from "../src/pages/LoginPage";
import { SignupPage } from "../src/pages/SignupPage";

test("Setup: create user and save storageState", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const signup = new SignupPage(page);

  const email = randomEmail("e2e");
  const password = testData.user.password;

  await home.open();
  await home.goToLogin();

  await login.startSignup(testData.user.name, email);
  await signup.fillAccountInfo(password);
  await signup.createAccount();

  // save auth state
  await page.context().storageState({ path: STORAGE_STATE.AUTH });
});
