// HACK: No typescript declaration file available: https://github.com/apexcharts/vue3-apexcharts/issues/2
// eslint-disable-next-line
// @ts-ignore
import VueApexCharts from "vue3-apexcharts";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueApexCharts);
});
