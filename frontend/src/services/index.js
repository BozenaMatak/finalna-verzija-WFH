import axios from 'axios';
import $router from '@/router';


let Service = axios.create({     
    baseURL: 'http://localhost:3000/',  
    timeout: 1000,

});

Service.interceptors.request.use((request) => {
   try{
       request.headers['Authorization'] = 'Bearer ' + Auth.getToken();
   }
   catch(e){
       console.error(e);
   }
   return request;
});
Service.interceptors.response.use(
    (response) => {
        console.log('Interceptor', response);
        return response;
    },
    (error) => {
        if(error.response.status == 401){
            Auth.logout();
            $router.go();
        }
        //console.error('Interceptor', error.response)
    }
);


let Posts = {    

    async getAllComment(jobId) {
        let response = await Service.get(`/jobs/${jobId}/comments`);
        return response.data.map(doc => {
            
                return {
                    id: doc._id,
                    jobId: doc.Idjoba,
                    posted_at: Number(doc.postedAt),
                    komentar: doc.komentar,
                    ime: doc.ime,
                    prezime: doc.prezime
                };
            
        });
    },
    add_job(job) {
        return Service.post('/jobs', job);
    },
    update_job(job ,jobId){
        return Service.patch(`/jobs/${jobId}/EditJob`, job)
    },
    update_profil(user, email){
        return Service.patch(`/editprofil/${email}`, user)
    },
    change_password(user){
        return Service.patch(`/user`, user)
    },
    delete_job(jobId){
        return Service.delete(`/jobs/${jobId}`)
    },

    add_comment(comment) {
        return Service.post('/jobs/:jobId/comments', comment);
    },
    
    async getAll() {        
        let response = await Service.get(`/jobs`)
        let data = response.data
        data = data.map(doc =>{
            return {
                id:doc._id,
                ime: doc.ime,
                prezime: doc.prezime,
                naziv_posla: doc.naziv_posla,
                kategorija_posla: doc.kategorija_posla,
                opis_posla: doc.opis_posla,
                potrebne_vjestine: doc.potrebne_vjestine,
                zarada: doc.zarada,
                posted_at: Number (doc.posted_at)
            
            };
        });
        return data
    },
    async getOne(id){
        let response = await Service.get(`/jobs/${id}`);
        let doc = response.data;
        return {
            id:doc._id,
            ime: doc.ime,
            prezime: doc.prezime,
            naziv_posla: doc.naziv_posla,
            kategorija_posla: doc.kategorija_posla,
            opis_posla: doc.opis_posla,
            potrebne_vjestine: doc.potrebne_vjestine,
            zarada: doc.zarada,
            posted_at: Number(doc.posted_at),
            email: doc.email

            
        };
    }, 
}


let Auth = {
    
    async login(email, password){
        let response = await Service.post("/auth",{
           email: email,
           password: password,
        });
        let user = response.data
        localStorage.setItem("user", JSON.stringify(user)); 

        return true;
    },
    registracija(user) {
        return Service.post('/user', user);
    },
    logout(){
      localStorage.removeItem("user");
    },
    getUser(){
      return JSON.parse(localStorage.getItem("user"))  
    },
    profil(){
        let user = Auth.getUser()
        if(user){
            return user
        }
    },
    getToken(){
        let user = Auth.getUser();
        if(user && user.token){
            return user.token
        }
        else{
            return false;
        }
    },
    authenticated(){
        let user = Auth.getUser()
        if(user && user.token){
           return true 
        }
        else{
            return false
        }
    },
    state: {
        get authenticated (){ //pomocu get ovaj atribut authenticated pretvaramo u funkciju
           return Auth.authenticated(); //pozivamo ju kao funckiju ali kad ju citamo ne moramo ju pozvat kao funkciju nego kao atribut 
        },
    }
};

export { Service, Posts, Auth } // exportamo Service za ručne pozive ili Posts za metode.
