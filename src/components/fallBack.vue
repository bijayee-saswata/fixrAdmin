<template>
  <div class="container text-center">
    <div class="status">404</div>
    <div class="message">Page Not Found</div>
    <a href="/">
      <button class="btn btn-primary">Go To HomePage</button>
    </a>
  </div>
</template>

<script>
export default {
  name: "fallBack"
};
</script>

<style lang="css" scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.status {
  font-size: 5em;
  font-weight: bold;
  color: lightgray;
  text-align: center;
}
.message {
  font-size: 2em;
  font-weight: 400;
}
.btn {
  margin-top: 10%;
}
</style>