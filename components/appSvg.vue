<template>
<svg :width="props.size" :height="props.size">
  <use :xlink:href="path"></use>
</svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  link: string,
  svgId: string,
  size: number,
}>()

const version = 1;

const path = `${props.link}?=${version}#${props.svgId}`
</script>