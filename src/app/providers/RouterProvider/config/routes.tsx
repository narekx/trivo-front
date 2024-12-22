import {
  CategoriesListPage,
  CategoryCreatePage,
  CategoryEditPage, CategoryShowPage,
  HomePage,
  LoginPage,
  NotFoundPage, ProductCreatePage, ProductShowPage, ProductsListPage,
  RegisterPage
} from "@pages";
import { authMiddleware, guestMiddleware } from "../middlewares";

import type { AppRouteType } from "../model";
import {ProductEditPage} from "../../../../pages/ProductEditPage";

export const AppRoutesMap: Array<AppRouteType> = [
  {
    path: "/",
    name: "Home",
    component: <HomePage />,
    layout: "auth",
    middlewares: [authMiddleware],
  },
  {
    path: "/login",
    name: "Login",
    component: <LoginPage />,
    layout: "default",
    middlewares: [guestMiddleware],
  },
  {
    path: "/register",
    name: "Register",
    component: <RegisterPage />,
    layout: "default",
    middlewares: [guestMiddleware],
  },
  {
    path: "/categories",
    name: "Categories List",
    component: <CategoriesListPage />,
    layout: "auth",
    middlewares: [authMiddleware],
  },
  {
    path: "/categories/create",
    name: "Category Create",
    component: <CategoryCreatePage />,
    layout: "auth",
    middlewares: [authMiddleware],
  },
  {
    path: "/categories/edit/:id",
    name: "Category Create",
    component: <CategoryEditPage />,
    layout: "auth",
    middlewares: [authMiddleware],
  },
  {
    path: "/categories/:id",
    name: "Category Show",
    component: <CategoryShowPage />,
    layout: "auth",
    middlewares: [authMiddleware],
  },
  {
    path: "/products",
    name: "Products List",
    component: <ProductsListPage />,
    layout: "auth",
    middlewares: [authMiddleware],
  },
  {
    path: "/products/create",
    name: "Product Create",
    component: <ProductCreatePage />,
    layout: "auth",
    middlewares: [authMiddleware],
  },
  {
    path: "/products/edit/:id",
    name: "Product Create",
    component: <ProductEditPage />,
    layout: "auth",
    middlewares: [authMiddleware],
  },
  {
    path: "/products/:id",
    name: "Product Show",
    component: <ProductShowPage />,
    layout: "auth",
    middlewares: [authMiddleware],
  },
  {
    path: "/*",
    name: "Not Found",
    component: <NotFoundPage />,
    layout: "default",
    middlewares: [guestMiddleware],
  },
];