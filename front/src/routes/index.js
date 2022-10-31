import Vue from "vue";
import VueRouter from "vue-router";

// import store from "@/store/index.js";
Vue.use(VueRouter);

// https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
// const onlyAuthUser = async (to, from, next) => {
//   // console.log(store);
//   const checkUserInfo = store.getters["memberStore/checkUserInfo"];
//   const getUserInfo = store._actions["memberStore/getUserInfo"];
//   let token = sessionStorage.getItem("access-token");
//   if (checkUserInfo == null && token) {
//     await getUserInfo(token);
//   }
//   if (checkUserInfo === null) {
//     alert("로그인이 필요한 페이지입니다..");
//     next({ name: "signIn" });

//   } else {
//     next();
//   }
// };

const routes = [
  {
    path: "/",
    name: "MainView",
    component: () => import("@/views/MainView.vue"),
  },
  {
    path: "/login",
    name: "LoginView",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/workbook",
    name: "WorkbookView",
    component: () => import("@/views/WorkbookView.vue"),
  },
  {
    path: "/questions",
    name: "QuestionsView",
    component: () => import("@/views/QuestionsView.vue"),
    children: [
      {
        path: "questionslist",
        name: "QuestionsList",
        component: () => import("@/components/questions/QuestionsList.vue"),
      },
      {
        path: "questionsdetail",
        name: "QuestionsDetail",
        component: () => import("@/components/questions/QuestionsDetail.vue"),
      },
    ],
  },
  {
    path: "/competition",
    name: "CompetitionView",
    component: () => import("@/views/CompetitionView.vue"),
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
