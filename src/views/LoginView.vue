<template>
  <div>
    <h1>Login Page</h1>
    <form v-on:submit.prevent novalidate>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          v-model="username"
          :required="true"
        />
        <span v-if="errors.username">
          {{ errors.username }}
        </span>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          v-model="password"
          :required="true"
        />
        <span v-if="errors.password">
          {{ errors.password }}
        </span>
      </div>
      <button type="submit" @click="login()">Send</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      errors: [],
      username: null,
      password: null,
    };
  },
  methods: {
    checkForm() {
      if (this.username?.length > 0 && this.password?.length > 0) {
        this.errors = [];
        return true;
      }

      if (!this.username) {
        this.errors["username"] = "Username required.";
      }
      if (!this.password) {
        this.errors["password"] = "Password required.";
      }
    },
    async login() {
      await this.checkForm();
      let { username, password, errors } = this;
      if (errors.length > 0) {
        this.checkForm();
      } else {
        let formData = {
          username: username,
          password: password,
        };
        axios
          .post("http://localhost:3000/api/login", formData)
          .then((response) => {
            console.log(response.data);
            let data = response.data;
            if (data.result && data.result_message.type == "success") {
              localStorage.setItem("token", JSON.stringify(data.result.token));
              delete data.result.token;
              localStorage.setItem("user", JSON.stringify(data.result));
              this.$router.push("/home");
            }
          })
          .catch((error) => {
            this.errors.push(error);
          });
      }
    },
  },
};
</script>
