<template>
	<div class="loader"><div class="cirl x"></div><div class="cirl2 x"></div></div>
</template>
<style>
.loader {
	height: 100%;
	width: 100%;
}
.cirl {
	position: fixed;
	height: 100px;
	width: 100px;
	background: none;
	border: 20px solid #25ceff;
	border-radius: 50%;
	animation-name: example;
  animation-duration: 4s;
	animation-iteration-count:infinite;
}
.x {
	top: calc(50% - 50px);
	left: calc(50% - 50px);
}
.cirl2 {
	position: fixed;
	height: 100px;
	width: 100px;
	background: none;
	border: 20px solid #25ceff;
	border-radius: 50%;
	animation-name: example2;
  animation-duration: 4s;
	animation-iteration-count:infinite;
}

@keyframes example {
  from {
		transform: rotate(0deg)
	}
	
  to {
		transform: rotateX(365deg)
	}
}
@keyframes example2 {
  from {
		transform: rotateY(0deg)
	}
	
  to {
		transform: rotateY(365deg)
	}
}
</style>