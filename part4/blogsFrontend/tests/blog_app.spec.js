import { test, expect } from "@playwright/test";
import { loginWith, createBlog } from "./helper.js";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");

    await request.post("/api/users", {
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

  test("user can login ", async ({ page }) => {
    await loginWith(page, "test", "test");

    await expect(page.getByText("test logged in")).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "test", "wrongpassword");

    await expect(page.getByText("Invalid username or password")).toBeVisible();
  });

  test.describe("when logged in", () => {
    test("a blog can be created", async ({ page }) => {
      await loginWith(page, "test", "test");

      await expect(page.getByText("test logged in")).toBeVisible();

      await createBlog(
        page,
        "Cien años de soledad",
        "Gabriel García Márquez",
        "gabo@gmail.com",
      );

      await expect(
        page.getByText("Added Cien años de soledad by Gabriel García Márquez"),
      ).toBeVisible();
    });

    test("blog details can be shown", async ({ page }) => {
      await loginWith(page, "test", "test");

      await expect(page.getByText("test logged in")).toBeVisible();

      await createBlog(
        page,
        "Cien años de soledad",
        "Gabriel García Márquez",
        "gabo@gmail.com",
      );

      await page.getByRole("button", { name: /view/i }).click();

      await expect(page.getByText("gabo@gmail.com")).toBeVisible();
    });

    test("user can update an existing blog", async ({ page }) => {
      await loginWith(page, "test", "test");
      await expect(page.getByText("test logged in")).toBeVisible();

      await createBlog(
        page,
        "Cien años de soledad",
        "Gabriel García Márquez",
        "gabo@gmail.com",
      );

      await page.getByRole("button", { name: "View" }).click();

      await expect(page.getByText("gabo@gmail.com")).toBeVisible();

      page.on("dialog", (dialog) => dialog.accept());

      await createBlog(
        page,
        "Cien años de soledad",
        "Gabriel García Márquez",
        "https://updated.com",
      );

      await expect(page.getByText("https://updated.com")).toBeVisible();

      await expect(page.getByText("https://gabo.com")).not.toBeVisible();
    });

    test("a user can delete a blog they created", async ({ page }) => {
      await loginWith(page, "test", "test");
      await expect(page.getByText("test logged in")).toBeVisible();

      await createBlog(
        page,
        "Blog to delete",
        "Andres",
        "https://example.com",
      );

      await expect(page.getByText("Added Blog to delete by Andres")).toBeVisible();

      await page.getByRole("button", { name: "view" }).click();

      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "Delete" }).click();


      await expect(page.getByText("Deleted Blog to delete")).toBeVisible();
      await expect(page.getByText("Blog to delete")).not.toBeVisible();
    });
  });
});
