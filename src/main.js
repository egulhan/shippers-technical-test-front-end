import {createApp} from "vue";
import axios from "axios";
import {createRouter, createWebHashHistory} from "vue-router";
import App from "./App";
import Home from "@/components/Home";
import ShipperContacts from "@/components/ShipperContacts";
import AddShipper from "@/components/AddShipper";
import UpdateShipper from "@/components/UpdateShipper";
import Api from "@/services/api";

// router config - begin
const routes = [
    {path: "/", component: Home},
    {path: "/shippers/:shipperId/contacts", component: ShipperContacts},
    {path: "/shippers/add", component: AddShipper},
    {path: "/shippers/:shipperId/update", component: UpdateShipper},
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
// router config - end

const app = createApp(App);

// api config - begin
const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
});

const api = new Api(axiosInstance);
// api config - end

app.config.globalProperties.$api = api;
app.use(router);
app.mount("#app");