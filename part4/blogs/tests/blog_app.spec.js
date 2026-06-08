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

    await request.post("/api/users", {
      data: {
        username: "Matti",
        name: "Matti",
        password: "Matti",
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

      await createBlog(page, "Blog to delete", "Andres", "https://example.com");

      await expect(
        page.getByText("Added Blog to delete by Andres"),
      ).toBeVisible();

      await page.getByRole("button", { name: "view" }).click();

      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "Delete" }).click();

      await expect(page.getByText("Deleted Blog to delete")).toBeVisible();
      await expect(page.getByText("Blog to delete")).not.toBeVisible();
    });
  });

  test.describe("Delete with user auth", () => {
    test("only creator can see delete button", async ({ page }) => {
      await loginWith(page, "test", "test");
      await expect(page.getByText("test logged in")).toBeVisible();

      await createBlog(
        page,
        "Creator Blog test",
        "Andres",
        "https://example.com",
      );

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();

      await page.getByRole("button", { name: "Logout" }).click();

      await loginWith(page, "Matti", "Matti");
      await expect(page.getByText("Matti logged in")).toBeVisible();

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();
    });
  });
  test("blogs are ordered by likes", async ({ page }) => {
    await loginWith(page, "test", "test");
    await expect(page.getByText("test logged in")).toBeVisible();

    await createBlog(page, "First Blog", "Andres", "https://first.com");

    await createBlog(page, "Second Blog", "Andres", "https://second.com");

    await createBlog(page, "Third Blog", "Andres", "https://third.com");

    const firstBlog = page.locator(".blog").filter({
      hasText: "First Blog",
    });

    const secondBlog = page.locator(".blog").filter({
      hasText: "Second Blog",
    });

    const thirdBlog = page.locator(".blog").filter({
      hasText: "Third Blog",
    });

    await firstBlog.getByRole("button", { name: "view" }).click();
    await secondBlog.getByRole("button", { name: "view" }).click();
    await thirdBlog.getByRole("button", { name: "view" }).click();

    // First Blog = 1 like
    await firstBlog.getByRole("button", { name: "Like" }).click();

    // Second Blog = 5 likes
    for (let i = 0; i < 5; i++) {
      await secondBlog.getByRole("button", { name: "Like" }).click();
    }

    // Third Blog = 3 likes
    for (let i = 0; i < 3; i++) {
      await thirdBlog.getByRole("button", { name: "Like" }).click();
    }

    // Esperar a que React reordene la lista
    await expect(page.locator(".blog").first()).toContainText("Second Blog");

    const blogs = page.locator(".blog");

    await expect(blogs.nth(0)).toContainText("Second Blog");
    await expect(blogs.nth(2)).toContainText("Third Blog");
    await expect(blogs.nth(1)).toContainText("First Blog");

  });
});
