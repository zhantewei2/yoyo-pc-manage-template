import Vue from 'vue'
import ElementUi from "element-ui";
import "./ice";
import "./styles/main.scss";
import "../../src/components/components.module";
import App from "./app.vue";
import router from "./router/routes";

Vue.use(ElementUi);
new Vue({
    router,
    render:h=>h(App)
}).$mount('#app');
