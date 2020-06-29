<template>
  <div id="pocetna">  
    <div class="container1">
      <div class="bottom-left">
        <div class="text">
          <p class="prvi-p" style=" font-family: 'Avenir', Helvetica, Arial, sans-serif;"><strong>Find a freelancer for any kind of job or find a job that best suits you.</strong></p>
          <p class="drugi-p" style="; font-family: 'Avenir', Helvetica, Arial, sans-serif;"><strong>Become a freelancer so you can work any kind of job, online.</strong></p>
          <div class="buttons">
            <button class="prvib"><router-link  to="/Registracija_poslovoda">Find a freelancer</router-link></button>
            <button class="drugib"><router-link  to="/Registracija_zaposlenik">Find a job</router-link></button>
          </div>
          <div class="row buttons-600">
            <button class="prvib"><router-link  to="/Registracija_poslovoda">Find a freelancer</router-link></button>
            <button class="drugib"><router-link  to="/Registracija_zaposlenik">Find a job</router-link></button>
          </div>
        </div>
      </div>
    </div>
    <section>
      <h2><strong style="text-align: center;">Find a perfect job for you and become an expert</strong></h2>
      <div class="row">  
        <div class="posao">
          <i class="fa fa-laptop" style="color:rgb(100, 130, 140);"></i>
          <br>
          <p class="text1">
            Website designe
          </p>
        </div>
        <div class="posao">
          <i class="fa fa-image" style="color:rgb(100, 130, 140);"></i>
          <br>
          <p class="text1">
            Photoshop
          </p>
        </div>
        <div class="posao">
          <i class="fa fa-wordpress" style="color:rgb(100, 130, 140);"></i>
          <br>
          <p class="text1">
            Logo designe
          </p>
        </div>
        <div class="posao">
          <i class="fa fa-table" style="color:rgb(100, 130, 140);"></i>
          <br>
          <p class="text1">
            SEO
          </p>
        </div>
        <div class="posao">
          <i class="fa fa-cubes" style="color:rgb(100, 130, 140);"></i>
          <br>
          <p class="text1">
            3D modelling
          </p>
        </div>
        <div class="posao">
          <i class="fa fa-mobile" style="color:rgb(100, 130, 140);"></i>
          <br>
          <p class="text1">
            Moblile Apps
          </p>
        </div>
        <div class="posao">
          <i class="fa fa-pencil" style="color:rgb(100, 130, 140);"></i>
          <br>
          <p class="text1">
            Writting
          </p>
        </div>
      </div>
      <div class="row">
        <div class="posao">
          <i class="fa fa-globe" style="color:rgb(100, 130, 140);"></i>
          <br>
          <p class="text1">
            Internet Marketing
          </p>
        </div>
        <div class="posao">
          <i class="fa fa-terminal" style="color:rgb(100, 130, 140);"></i>
          <br>
          <p class="text1">
            Software Development
          </p>
        </div>
        <div class="posao">
          <i class="fa fa-paint-brush" style="color:rgb(100, 130, 140);"></i>
          <br>
          <p class="text1">
            Graphic designe
          </p>
        </div>
        <div class="posao">
          <i class="fa fa-calculator" style="color:rgb(100, 130, 140);"></i>
          <br>
          <p class="text1">
            Banner designe
          </p>
        </div>
        <div class="posao">
          <i class="fa fa-android" style="color:rgb(100, 130, 140);"></i>
          <br>
          <p class="text1">
            Android Apps
          </p>
        </div>
        <div class="posao">
          <i class="fa fa-apple" style="color:rgb(100, 130, 140);"></i>
          <br>
          <p class="text1">
            Iphone Apps
          </p>
        </div>
        <div class="posao">
          <i class="fa fa-flag" style="color:rgb(100, 130, 140);"></i>
          <br>
          <p class="text1">
            Languages
          </p>
        </div>
      </div>  
    </section>
    
    
  </div>


</template>

<style lang="scss">
section{
  padding-top: 0;
}

.slika{
  max-width: 100%;;
}
.text{
  width: 40%;
  padding-top: 3%;
  margin-left: 3%;
  text-align: left;
}
.prvi-p{
  font-size:2.5vw;
}
.drugi-p{
  font-size:1.6vw;
}
.container1 {
  text-align: center;
  color: black;
}
.bottom-left {
  background-image: url("/pozadina.png");
  width:100%;
  text-align: left;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  
}
.buttons-600{
  display: none;
}

button{
  margin: 2%;
  border: none;
  padding: 1.5% 4%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 2vw;
  
}
.text1{
  color: black;
  font-size: 1.5vw;
}

.prvib{
  width: 50%;
  background-color: rgb(110, 160, 95);
  a{
    font-weight: bold;
    color: white;
    text-decoration: none; 
  }
}
.drugib{
  width: 50%;
  background-color: transparent;
  border: black solid 2px;
  a{
    font-weight: bold;
    color: black;
    text-decoration: none;
  }
  
  
}
h2{
  text-align: center;
  line-height: 2;
  font-size: 3.5vw;
  color: #0e1724;
  font-family:'Avenir', Helvetica, Arial, sans-serif;
}

.posao{
  color: #0e1724;
  font-family:'Avenir', Helvetica, Arial, sans-serif;
  font-weight: bold;
  flex-basis: 14%;
  height: 100px;
  margin-bottom: 24px;
  font-size: 20px;
  line-height: 2;
}
section{
  width: 97%;
  margin: 3% auto;
}
.fa{
  font-size:3.5vw;
}

@media(max-width: 1000px){
  .text{
  width: 60%;
  
}
.prvi-p{
  font-size:4vw;
}
.drugi-p{
  font-size:3vw;
}
}
@media(max-width: 600px){
  .bottom-left {
  
    background-size: 100% 100%;
    
  }
  .text{
    width: 80%;
    margin: auto;
  
  }
  .prvi-p{
    font-size:4vw;
  }
  .drugi-p{
    font-size:3vw;
  }
  .buttons{
    display: none;
  }
  .buttons-600{
    display: block;
    margin: auto;
  }
  .prvib, .drugib{
    width: 45%;
  }
  button{
    font-size: 3vw;
  }
  h2{
    font-size: 5vw;
  }
  section{
    margin: auto;
    margin-top: 1%;
    width: 90%;
  }
  .fa{
  font-size:8vw;
}
.text1{
  color: black;
  font-size: 2.5vw;
}
}


</style>
