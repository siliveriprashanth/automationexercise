import { test, expect } from "../../src/fixtures/testFixture";
import { STORAGE_STATE } from "../../src/utils/constants";
import { randomEmail } from "../../src/utils/random";
import { testData } from "../../src/utils/testData";

test.describe("AUTH MODULE", () => {
  test("TC-AUTH-001 @smoke Verify Login page opens", async ({ home, login }) => {
    await home.open();
    await home.goToLogin();
    await login.open();
  });

  test("TC-AUTH-002 Signup new user", async ({ page, home, login, signup }) => {
    const email = randomEmail("signup");
    const password = testData.user.password;

    await home.open();
    await home.goToLogin();

    await login.startSignup("New User", email);
    await signup.fillAccountInfo(password);
    await signup.createAccount();

    await expect(page.locator("a").filter({ hasText: "Logged in as" })).toBeVisible();
  });

  test("TC-AUTH-003 Signup already registered email should fail", async ({ home, login }) => {
    await home.open();
    await home.goToLogin();

    // Use same email always so that it exists
    await login.startSignup("Prashanth", "prashanth_demo_user@mailinator.com");
    await expect(login.signupErrorEmailExists).toBeVisible();
  });

  test("TC-AUTH-004 Login with invalid creds shows error", async ({ home, login }) => {
    await home.open();
    await home.goToLogin();

    await login.login("wrong@mailinator.com", "Wrong@123");
    await expect(login.loginError).toBeVisible();
  });

  test("TC-AUTH-005 Login with blank creds", async ({ home, login }) => {
    await home.open();
    await home.goToLogin();

    // browser validation may block form submit
    await login.login("", "");
    await expect(login.loginBtn).toBeVisible();
  });

  test("TC-AUTH-006 Verify password field is masked", async ({ home, login }) => {
    await home.open();
    await home.goToLogin();

    await expect(login.loginPassword).toHaveAttribute("type", "password");
  });

  // ✅ StorageState based tests (stable approach)

  test("TC-AUTH-007 @reg Verify Logged in as visible using storageState", async ({ browser }) => {
    const context = await browser.newContext({ storageState: STORAGE_STATE.AUTH });
    const page = await context.newPage();

    await page.goto("https://automationexercise.com");
    await expect(page.locator("a").filter({ hasText: "Logged in as" })).toBeVisible();

    await context.close();
  });

  test("TC-AUTH-008 Logout works (storageState)", async ({ browser }) => {
    const context = await browser.newContext({ storageState: STORAGE_STATE.AUTH });
    const page = await context.newPage();

    await page.goto("https://automationexercise.com");
    await expect(page.locator("a").filter({ hasText: "Logged in as" })).toBeVisible();

    await page.locator("a[href='/logout']").click();
    await expect(page).toHaveURL(/\/login/);

    await context.close();
  });

  test("TC-AUTH-009 Session persists after refresh (storageState)", async ({ browser }) => {
    const context = await browser.newContext({ storageState: STORAGE_STATE.AUTH });
    const page = await context.newPage();

    await page.goto("https://automationexercise.com");
    await expect(page.locator("a").filter({ hasText: "Logged in as" })).toBeVisible();

    await page.reload();
    await expect(page.locator("a").filter({ hasText: "Logged in as" })).toBeVisible();

    await context.close();
  });

  test("TC-AUTH-010 Delete account option visible after login", async ({ browser }) => {
    const context = await browser.newContext({ storageState: STORAGE_STATE.AUTH });
    const page = await context.newPage();

    await page.goto("https://automationexercise.com");
    await expect(page.locator("a[href='/delete_account']")).toBeVisible();

    await context.close();
  });

  test("TC-AUTH-011 Navigate to login page by URL", async ({ login }) => {
    await login.open();
  });

  test("TC-AUTH-012 Verify login page contains signup section", async ({ login }) => {
    await login.open();
    await expect(login.signupBtn).toBeVisible();
  });

  test("TC-AUTH-013 Invalid email format in login", async ({ home, login }) => {
    await home.open();
    await home.goToLogin();

    await login.login("invalid-email", "abc");
    await expect(login.loginBtn).toBeVisible();
  });

  test("TC-AUTH-014 Signup blank fields", async ({ home, login }) => {
    await home.open();
    await home.goToLogin();

    await login.startSignup("", "");
    await expect(login.signupBtn).toBeVisible();
  });

  test("TC-AUTH-015 Signup with invalid email", async ({ home, login }) => {
    await home.open();
    await home.goToLogin();

    await login.startSignup("User", "invalid");
    await expect(login.signupBtn).toBeVisible();
  });

  test("TC-AUTH-016 Login via UI using created user", async ({ page, home, login, signup }) => {
    const email = randomEmail("uiuser");
    const password = testData.user.password;

    await home.open();
    await home.goToLogin();

    await login.startSignup(testData.user.name, email);
    await signup.fillAccountInfo(password);
    await signup.createAccount();

    // logout then login again
    await page.locator("a[href='/logout']").click();
    await expect(page).toHaveURL(/\/login/);

    await login.login(email, password);
    await expect(page.locator("a").filter({ hasText: "Logged in as" })).toBeVisible();
  });

  test("TC-AUTH-017 Logout multiple times safe", async ({ page, home, login, signup }) => {
    const email = randomEmail("logout");
    const password = testData.user.password;

    await home.open();
    await home.goToLogin();

    await login.startSignup("User", email);
    await signup.fillAccountInfo(password);
    await signup.createAccount();

    await page.locator("a[href='/logout']").click();
    await expect(page).toHaveURL(/\/login/);

    // logout link should not be visible now
    await expect(page.locator("a[href='/logout']")).toHaveCount(0);
  });

  test("TC-AUTH-018 Verify storageState file login works - open login page should show logged-in header", async ({ browser }) => {
    const context = await browser.newContext({ storageState: STORAGE_STATE.AUTH });
    const page = await context.newPage();

    await page.goto("https://automationexercise.com/login");

    // even if you're on login page, header should show Logged in as
    await expect(page.locator("a").filter({ hasText: "Logged in as" })).toBeVisible();

    await context.close();
  });
});
