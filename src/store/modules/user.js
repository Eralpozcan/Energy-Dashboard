import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  state: {
    user: null,
    auth: null,
    authError: false,
    loginExpire: false,
    hasedPassword: null,
  },
  mutations: {
    userLogin(state, payload) {
      state.user = payload;
      setTimeout(() => {
        state.auth = true;
        //router
      }, 1000);
    },
    userLogout(state) {
      state.user = null;
    },

  },
  actions: {
    TokenExpireCheck({ context }) {
      if (window.localStorage.getItem("token")) {
        try {
          let token = jwt.verify(
            window.localStorage.getItem("token"),
            process.env.VUE_SECRET_KEY
          );
          if (token.exp < Date.now()) {
            context.commit("userLogin", token.user);
          }
        } catch (error) {
          console.log("Login Expired");
          //context.state.loginExpire = true
        }
      }
    },
    Register({ context, state }, userData) {
      axios
        .post(process.env.VUE_APP_API + "/account/register", {
          ...userData.user,
        })
        .then((response) => {
          console.log(response);
          let token = response.data.token;
          window.localStorage.setItem("token", token);
          try {
            let resToken = jwt.verify(token, process.env.VUE_SECRET_KEY);
            if (userData.remember) {
              window.localStorage.setItem(
                "user",
                JSON.stringify({
                  email: resToken.user.email,
                  ...userData.user,
                })
              );
            }
            context.commit("userLogin", resToken.user);
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => {
          console.log("Error Hata", err);
          state.auth = null;
          state.authError = true;
        });
    },
    async Login({ commit, state }, userData) {
      await axios
        .post(process.env.VUE_APP_API + "/account/login", {
          ...userData.user,
        })
        .then((response) => {
          let token = response.data.token;
          console.log(response.data.role)
          window.localStorage.setItem("token", token);
          try {
            let resToken = jwt.verify(token, process.env.VUE_SECRET_KEY);
            if (userData.remember){
              window.localStorage.setItem(
                "user",
                JSON.stringify({
                  email: resToken.user.email,
                  ...userData.user,
                  role: resToken.user.role,
                })
              );
            }
            commit("userLogin", resToken.user);
          } catch (error) {
            console.log("Login Try", error);
          }
        })
        .catch((err) => {
          console.log("Login Error", err);
          state.auth = null;
          state.authError = true;
        });
    },
    Logout({ commit }) {
      window.localStorage.removeItem("token");
      commit("userLogout");
    },
  },
};
