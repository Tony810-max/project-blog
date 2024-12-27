import { reactive } from "vue";

export const userCurrent = reactive({
  user: JSON.parse(localStorage.getItem("user-current")),
});

export const setUserCurrent = (user) => {
  userCurrent.user = user;
  if (user) {
    localStorage.setItem("user-current", JSON.stringify(user));
  } else {
    localStorage.removeItem("user-current");
  }
};
