import { test, expect } from "@playwright/test";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "test",
        username: "test",
        password: "test",
      },
    });

    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Login" }).first(),
    ).toBeVisible();
  });

  test("user can click login button", async ({ page }) => {
    const loginButton = page.getByRole("button", { name: "Login" });

    await loginButton.click();
    await page.getByTestId("username").fill("test");
    await page.getByTestId("password").fill("test");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("test logged in")).toBeVisible();
  });

  test("user can submit a new blog post", async ({ page }) => {
    const loginButton = page.getByRole("button", { name: "Login" });

    await loginButton.click();
    await page.getByTestId("username").fill("test");
    await page.getByTestId("password").fill("test");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("test logged in")).toBeVisible();

    await page.getByRole("button", { name: "Add New Blog" }).click();
    await page.getByTestId("title").fill("Cien años de soledad");
    await page.getByTestId("author").fill("Gabriel García Márquez");
    await page.getByTestId("url").fill("gabo@gmail.com");
    await page.getByRole("button", { name: "Add" }).click();

    await expect(
      page.getByText("Added Cien años de soledad by Gabriel García Márquez"),
    ).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByTestId("username").fill("test");
    await page.getByTestId("password").fill("wrongpassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Invalid username or password")).toBeVisible();
  });
});

test.describe("and a blog exists", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole("button", { name: "Add New Blog" }).click();

    await page.getByTestId("title").fill("another blog by playwright");

    await page.getByTestId("author").fill("Andrew");

    await page.getByTestId("url").fill("https://playwright.dev");

    await page.getByRole("button", { name: "Add" }).click();

    await expect(page.getByText("another blog by playwright")).toBeVisible();
  });
});
