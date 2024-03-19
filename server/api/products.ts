export default defineEventHandler((event) => {
  if (event.method !== "POST") return {error: "not POST request"}

  return {
    hello: event.context
  }
})