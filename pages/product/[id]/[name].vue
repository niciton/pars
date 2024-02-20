<template>
  <div>Hi, it`s product</div>
</template>

<script setup lang="ts">
const route = useRoute();

console.log(route.params);

useFetch("/api/products", {
  method: "post",
  body: route.params,
}).then((res) => {
  console.log(res.data.value);
});

// useFetch(
//   "http://0.0.0.0:5757/",
//   {
//     method: "post",
//     body: {
//       url: "https://megamarket.ru/catalog/details/videokarta-pci-e-gigabyte-geforce-rtx-3060-windforce-gv-n3060wf2oc-12gd-12gb-gddr6-192bi-100044948640/#?details_block=prices",
//     },
//     onRequest({ request, options }) {
//       // Set the request headers
//       // options.headers = options.headers || {}
//       console.log("1");
//     },
//     onRequestError({ request, options, error }) {
//       // Handle the request errors
//       console.log("2");
//     },
//     onResponse({ request, response, options }) {
//       // Process the response data
//       // localStorage.setItem('token', response._data.token)
//       console.log("3");
//       console.log(response);
//     },
//     onResponseError({ request, response, options }) {
//       console.log("4");
//       // Handle the response errors
//     },
//   }
// ).then((res) => {
//   console.log(res.data.value);
//   return res;
// });
</script>