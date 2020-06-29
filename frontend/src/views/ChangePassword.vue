<template>
  <div class="pozadina">
    <div class="login">
      <div class="naslov">
        <h1><strong>Work from <span style="color:rgb(146, 187, 214)">home</span></strong></h1>
        <h2 style="color: rgb(150, 187, 220)"><strong>Change Password</strong></h2>
      </div>
      <form @submit.prevent="changePassword">
        <div class="form-group">
          <input v-model="old_password" type="password" class="form-control"  aria-describedby="emailHelp" placeholder="Old Password">
        </div>
        <div class="form-group">
          <input v-model="new_password" type="password" class="form-control"  aria-describedby="emailHelp" placeholder="New Password">
        </div>
        <div class="form-group">
          <input v-model="check_new_password" type="password" class="form-control"  aria-describedby="emailHelp" placeholder="Repeat new password">
        </div> 
        <button type="submit" class="btn btn primary">Change Password</button>
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
      old_password: "",
      new_password: "",
      check_new_password: "",
      user: {} 

    }
  },
  name: 'ChangePassword',
  created() {
        this.profil();
        
    },
  methods: {
    profil(){
        this.user = Auth.profil()
    },
    async changePassword(){

        if(this.check_new_password == this.new_password){
            let user = {
                new_password: this.new_password,
                old_password: this.old_password,
            };
            let newuser = await Posts.change_password(user);
            this.$router.push({path: '/'});
            alert('Uspješno ste izmjenili lozinku')
        }
        else{
            alert("Nova lozinka i check lozinka vam se  ne podudaraju")
            return;
        }        
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