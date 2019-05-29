<template>
  <div class="contact">
    <div class="form">
      <div class="wrap">
        <input type="text" placeholder="Naam">
        <input type="text" placeholder="Email">
        <input type="text" placeholder="onderwerp">
        <textarea></textarea>
        <button>verzenden</button>
      </div>
    </div>
    <div class="contactinfo">
      <p>Telefoonnummer: (+31)06 43227028</p>
      <p>Email: Enquota@gmail.com</p>
      <div class="icons"></div>
    </div>
  </div>
</template>
<style scoped>
.contact {
  min-height: 400px;
  width: 100%;
  background: purple;
  display: flex;
}
.form {
  flex: 1;
  background: blue;
}
.form .wrap {
  width: 400px;
  min-height: 300px;
  flex-direction: row                       ;
  background: purple;
}
.wrap input , .wrap textarea{
  width: 100%;
  
}

.contactinfo {
  flex: 1;
  background: orange;
}
</style>
