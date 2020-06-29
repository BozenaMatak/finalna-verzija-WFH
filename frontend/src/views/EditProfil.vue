<template>
  <div class="pozadina">
    <div class="login">
      <div class="naslov">
        <h1><strong>Work from <span style="color:rgb(146, 187, 214)">home</span></strong></h1>
        <h2 style="color: rgb(150, 187, 220)"><strong>Edit profile</strong></h2>
      </div>
      <form @submit.prevent="updateprofil">
        <div class="form-group">
          <input v-model="user.ime" type="ime" class="form-control"  aria-describedby="emailHelp" placeholder="First name">
        </div>
        <div class="form-group">
          <input v-model="user.prezime" type="prezime" class="form-control"  aria-describedby="emailHelp" placeholder="Last name">
        </div>
        <div class="form-group">
          <input v-model="user.godina" type="godina" class="form-control"  placeholder="How old are you?">
        </div>
        <div style="text-align: left;" class="form-group">
          <label style="font-size: 18px; color: grey;" for="category">Country</label>
          <select style="border: rgb(233, 230, 230) 3px solid;" v-model="user.drzava" class="form-control form-control-lg">
            <option :key="drzava.id" v-for="drzava in drzave"><p>{{drzava}}</p></option>
          </select>
        </div>
        <div style="text-align: left;" class="form-group">
          <label style="font-size: 18px; color: grey;" for="category">City</label>
          <select style="border: rgb(233, 230, 230) 3px solid;" v-model="user.grad" class="form-control form-control-lg">
            <option :key="grad.id" v-for="grad in gradovi"><p>{{grad}}</p></option>
          </select>
        </div>
        <div v-if="user.tip == 'poslodavac'" style="text-align: left;" class="form-group">
          <label style="font-size: 18px; color: grey;" for="category">Job category</label>
          <select style="border: rgb(233, 230, 230) 3px solid;" v-model="user.kategorija_posla" class="form-control form-control-lg">
            <option :key="kategorija.id" v-for="kategorija in kategorije"><p>{{kategorija}}</p></option>
          </select>
        </div> 
        <div v-if="user.tip == 'poslodavac'" class="form group" style="text-align: left;">
          <textarea v-model="user.opis_posla" placeholder="Job description" id="w3mission">           
          </textarea>
        </div>
        <div v-if="user.tip == 'freelancer'" class="form-group">
          <input v-model="user.vjestine" type="vjestine" class="form-control"  placeholder="Which skills do you have?">
        </div>
        <div v-if="user.tip == 'freelancer'" class="form-group">
          <input v-model="user.minimalna_zarada" type="minzarada" class="form-control"  placeholder="Minimum hourly rate">
        </div>
        <div v-if="user.tip == 'freelancer'" class="form-group">
          <input v-model="user.ostalo" type="ostalo" class="form-control"  placeholder="Anything else?">
        </div> 
        <button type="submit" class="btn btn primary">Edit profile</button>
      </form>
    </div>
  </div>    
</template>

<script>

import {Auth} from "@/services";
import {Posts} from "@/services";

export default {
  data (){
    return{
      i:1,
      kategorije:['Web pages IT & Software', 'Writting and content', 'Engineering & Science','Designe, Media & Architecture', 'Sales and marketing','Translation & Languages','Mobile phone apps', 'Other'],
      gradovi:['Tirana', 'Andora la Vella', 'Beč','Bruxeles', 'Minsk','Sarajevo','Sofija', 'Podgorica', 'Prag', 'Kopenhagen', 'Talin', 'Helsinki', 'Pariz','Atena', 'Amsterdam', 'Zagreb','Dublin','Reykjavik','Rim', 
              'Riga', 'Vaduz', 'Vilnius', 'Luksemburg', 'Budimpešta','Skopje','La Valleta','Kišinjev','Monako',
              'Berlin','Oslo','Varšava','Lisabon','Bukurešt','San Marino','Bratislava','Ljubljana','Beograd','Madrid','Bern',
              'Stocholm','London','Kijev','Vatikan'],
      drzave:['Albanija', 'Andora', 'Austrija','Belgija', 'Bjelorusija','BiH','Bugarska', 'Crna Gora', 'Češka', 'Danska', 'Estonija', 'Finska', 'Francuska','Grčka', 'Nizozemska', 'Hrvatska','Irska','Island','Italija', 
              'Latvija', 'Lihtenštajn', 'Litva', 'Luksemburg', 'Mađarska','Makedonija','Malta','Moldova','Monako',
              'Njemačka','Norveška','Poljska','Portugal','Rumunjska','San Marino','Slovačka','Slovenija','Srbija','Španjolska','Švicarska',
              'Švedska','UK','Ukrajina','Vatikan'],
      user: {} 

    }
  },
  name: 'EditProfil',
  created() {
        this.profil();
        
    },
  methods: {
    prikaz(){
      this.i=this.i+1;
    },
    profil(){
        this.user = Auth.profil()
    },
    async updateprofil(){
        let user = {
          email: this.user.email,
          password: this.user.password,
          ime: this.user.ime,
          prezime: this.user.prezime,
          godina: this.user.godina,
          kategorija_posla: this.user.kategorija_posla,
          grad: this.user.grad,
          drzava: this.user.drzava,
          opis_posla: this.user.opis_posla,
          vjestine:this.user.vjestine,
          minimalna_zarada:this.user.minimalna_zarada,
          ostalo: this.user.ostalo,
          tip: this.user.tip  

        };
        let email = this.user.email
        let newuser = await Posts.update_profil(user, email);
        console.log('Uspješno ste updatali profil, molimo vas da se ponovo ulogirate', newuser.data);
        this.$router.push({path: '/'});
        alert('Uspješno ste izmjenili profil, molimo vas da se izlogirate pa ponovno ulogirate')
        
    },
  },
}
</script>

<style scoped>
  .pozadina{
    
    width: 100%;
    min-height: 700px;
    
  }
  .login{
    background-color:white;
    width: 30%;
    margin: 5% auto;
    padding: 2% 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    box-shadow: 9px 9px 7px gray;
  }
  .naslov{
    border-bottom: 1.5px solid 	rgb(233, 230, 230);
    width: 90%;
    margin: auto;
    margin-bottom: 10%;
  }

  form{
    width: 80%;
    margin: auto;
  }
  .form-group{
    margin: 6% 3%;
    clear: both;
  }
  input{
    padding: 6%;
    font-size: 18px;
    background-color:white;
    border: rgb(233, 230, 230) 3px solid;
    
  }
   button{
    font-size: 20px;
    width: 60%;
    margin:auto;
    background-color:rgb(146, 187, 214);
    border: none;
    padding: 3%;
    color: white;
    margin-top: 20px;
    font-weight: bold;
  }
    button:hover{
     box-shadow: 9px 9px 7px gray;
    }
    #w3mission{
    width: 93%;
    padding: 6%;
    font-size: 18px;
    background-color:white;
    border: rgb(233, 230, 230) 3px solid;  
    margin: 2% 2%; 
  }

   @media(max-width: 900px){

      .login{
        width: 50%;
      }
    }


   @media(max-width: 600px){

   .login{
    width: 90%;
  }
  h1 {
    font-size: 35px;
  }
  h2{
    font-size: 28px;
  }
  i {
    font-size: 25px;
  }

}

</style>