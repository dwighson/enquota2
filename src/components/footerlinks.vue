<template>
  <footer>
    <div class="links">
      <div class="link">
        <ul>
          <li>FAQ</li>
          <li>Privacyreglement</li>
          <li>Verzending & retour</li>
          <li>Algemene Voorwaarden</li>
        </ul>
      </div>
    </div>
    <div class="footer"></div>
  </footer>
</template>
<script>
export default {
  mounted() {}
};
</script>

<style scoped>
footer {
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: orange;
}
.links {
  flex: 1;
  text-align: center;
  background: greenyellow;
}
.link {
  height: 100%;
  width: 300px;
  background: blue;
  padding: 5px;
  margin: 5px;
  display: inline-block;
}
.link li {
  text-align: left;
  display: block;
}
.footer {
  height: 20px;
  width: 100%;
  background: #141414;
}
</style>
