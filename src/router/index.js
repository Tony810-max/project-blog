import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView/index.vue";
import CreateBlog from "@/views/CreateBlog/index.vue";
import ManageBlog from "@/views/ManageBlog/index.vue";
import UpdateBlog from "@/views/UpdateBlog/index.vue";
import DetailBlog from "@/views/DetailBlog/index.vue";
import LoginPage from "@/views/Auth/LoginPage/index.vue";
import RegisterPage from "@/views/Auth/RegisterPage/index.vue";

export const ROUTE = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/create-blog",
    name: "create-blog",
    component: CreateBlog,
  },
  {
    path: "/manage-blog",
    name: "manage-blog",
    component: ManageBlog,
  },
  {
    path: "/update-blog/:id",
    name: "update-blog",
    component: UpdateBlog,
  },
  {
    path: "/detail-blog/:id",
    name: "detail-blog",
    component: DetailBlog,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: ROUTE,
});

export default router;
