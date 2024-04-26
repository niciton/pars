<template>
  <div class="wrapper">
    <NuxtLayout name="default">
      <div class="main">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
@import "@/other/style/load.scss";

* {
  box-sizing: border-box;
}

.bonus {
  position: relative;
  overflow: hidden;
  display: flex;
  // align-items: center;
  gap: 4px;
  font-size: 13px;
  padding: 3px 10px;
  border-radius: 30px;
  color: #fff;
  background: var(--green);
  font-weight: 600;
}

.spasibo {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 9px 9px 9px 0px;
  width: 12px;
  height: 12px;

  &::before {
    font-size: 13px;
    content: "c";
    color: #2da110;
  }
}

button,
select {
  cursor: pointer;
}

a {
  text-decoration: none;
  color: inherit;
}
ul,
ol,
li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .main {
    flex: 1 1 auto;
  }
}

body {
  --green: #2da110;
  --global-bg: #000;
  --global-color: #c7c7c7;
  --global-shadow: 0px 0px 25px rgba(255, 255, 255, 0.5);
  background: var(--global-bg);
  color: var(--global-color);
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;

  // background: #ffffff30;
}
</style>