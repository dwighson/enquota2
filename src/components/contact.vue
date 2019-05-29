<template>
  <div class="contact">
    <h1>Contact Ons</h1>
    <span class="flex">
      <div class="form">
        <div class="formwrap">
          <input type="text" placeholder="Naam">
          <input type="text" placeholder="Email">
          <input type="text" placeholder="onderwerp">
          <textarea placeholder="Bericht"></textarea>
          <button>verzenden</button>
        </div>
      </div>
      <div class="contactinfo">
        <p>Telefoonnummer: (+31)06 43227028</p>
        <p>Email: Enquota@gmail.com</p>
        <div class="icons"></div>
      </div>
    </span>
  </div>
</template>
<style scoped>
.contact {
  min-height: 400px;
  width: 100%;
  flex-direction: column;
  display: flex;
}
h1 {
  text-align: center;
  height: 80px;
  line-height: 80px;
  margin-bottom: 20px;
}
.flex {
  font-size: 20px;
  display: flex
}
.form {
  flex: 1;
  box-sizing: border-box;
  margin: 0px 40px;
}
.form .formwrap {
  float: right;
  width: 560px;
  box-sizing: border-box;
  min-height: 300px;
  display: flex;
  flex-direction: column;                      ;
}
.formwrap input , .formwrap textarea{
  flex: 1;
  min-height: 35px;
  border: 1px solid rgba(0,0,0, .2);
  padding: 5px;
  font-size: 18px;
  border-radius: 5px;
  margin: 5px;

}
.formwrap textarea {
  min-height: 250px;
}
.formwrap button {
  margin: 5px;
  width: 200px;
  font-weight: normal;
  border-radius: 5px;

}
.contactinfo {
  flex: 1;
 
}
</style>
