import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { EmptyLayout, DefaultLayout, LoginLayout } from "./layouts";

const app = createApp(App);

app.component("default-layout", DefaultLayout);
app.component("login-layout", LoginLayout);
app.component("empty-layout", EmptyLayout);

app.use(createPinia());
app.use(router);

app.mount("#app");
