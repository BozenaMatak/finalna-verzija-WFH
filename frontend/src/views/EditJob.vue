<template>
  <div class="pozadina">
    <div v-if="user.tip=='poslodavac'" class="login">
      <div class="naslov">
        <h1><strong>Work from <span style="color: rgb(146, 187, 214)">home</span></strong></h1>
        <h2 style="color: rgb(150, 187, 220)"><strong><i class="fa fa-plus"></i>Edit job</strong></h2>
      </div>
      <form @submit.prevent="updatejob">
        <div class="form-group">
          <input v-model="job.naziv_posla" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Job title">
        </div>
        <div style="text-align: left;" class="form-group">
          <label style="font-size: 18px; color: grey;" for="category">Job category</label>
          <select style="border: rgb(233, 230, 230) 3px solid;" v-model="job.kategorija_posla" class="form-control form-control-lg">
            <option :key="kategorija.id" v-for="kategorija in kategorije"><p>{{kategorija}}</p></option>
          </select>
        </div> 
        <div class="form group" style="text-align: left;">
          <textarea v-model="job.opis_posla" placeholder="Job description" id="w3mission">           
          </textarea>
        </div>
       <div class="form group" style="text-align: left;">
          <textarea v-model="job.potrebne_vjestine" placeholder="Required skills" id="w3mission">
          </textarea>
        </div>
        <div class="form-group">
          <input v-model="job.zarada" type="text" class="form-control" id="exampleInputPassword1" placeholder="Salary">
        </div>
        <button type="submit" class="btn btn primary">Edit job</button>
      </form>
    </div>
    <div v-if="user.tip != 'poslodavac'">
      <p>Molimo registrirajte se kao poslodavac</p>
    </div>
  </div>    
</template>

<script>
import { Posts } from '@/services';
import {Auth} from "@/services";

export default {
    data() {
        return {
            kategorije:['Web pages IT & Software', 'Writting and content', 'Engineering & Science','Designe, Media & Architecture', 'Sales and marketing','Translation & Languages','Mobile phone apps', 'Other'],
            user: {},
            job: {},
            id: ''
        };
    }, 
    name: 'PostJob',
    methods: {
      async updatejob(){
        let job = {
          naziv_posla: this.job.naziv_posla,
          kategorija_posla: this.job.kategorija_posla,
          zarada: this.job.zarada,
          opis_posla: this.job.opis_posla,
          potrebne_vjestine: this.job.potrebne_vjestine

        };
        let jobId = this.id
        let newjob = await Posts.update_job(job, jobId);
        console.log('Spremljeni posao', newjob.data);

        this.$router.push({ path: `/Job/${this.id}` });
      },
      profil(){
        this.user = Auth.profil()
      },
      async jobdetail(){
        this.id = this.$route.params.id
        console.log(this.id);
        this.job = await Posts.getOne(this.id);
        console.log("dawad",this.job)
       
      }
  },
  
  created() {
      this.profil();
      this.jobdetail();
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
    width: 80%;
    margin: auto;
    margin-bottom: 10%;
  }

  form{
    width: 80%;
    margin: auto;
  }
  .form-group{
    margin: 5% 3%;
    clear: both;
  }
  input{
    padding: 6%;
    font-size: 18px;
    background-color:white;
    border: rgb(233, 230, 230) 3px solid;
  }
  #w3mission{
    width: 93%;
    padding: 6%;
    font-size: 18px;
    background-color:white;
    border: rgb(233, 230, 230) 3px solid;  
    margin: 2% 2%; 
  }
  
  
  form button{
    font-size: 23px;
    width: 60%;
    margin:auto;
    background-color:rgb(146, 187, 214);
    border: none;
    padding: 3%;
    color: white;
    margin-top: 20px;
    font-weight: bold;
  }
   form button:hover{
     box-shadow: 9px 9px 7px gray;
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