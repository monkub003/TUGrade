<template>
    <body>
    <div class="wrapper-login">
        <form action="">
            <div class="Tugrade-Logo"></div>
            <h1>Thammasat University student’s grades</h1>
            <h2>ระบบประกาศคะแนนและเกรด</h2>

            <div class="input_form">
                <i class='bx bxs-user'></i>
                <input type="text" placeholder="รหัสนักศึกษา" v-model = "student_id" required>
            </div>

            <div class="input_form">
                <i class='bx bxs-lock-alt'></i>
                <input type="password" placeholder="รหัสผ่าน" v-model = "password" required>
            </div>
            <div></div>

            <button type="submit" class="login-btn" v-on:click="login">เข้าสู่ระบบ</button>
            <!-- <router-link to="/home">เข้าสู่ระบบ</router-link> //For Testing only -->
            <p>สำหรับนักศึกษามหาวิทยาลัยธรรมศาสตร์เท่านั้น</p>
            
            <div class="TU-Background"></div>
            
            <!-- <p v-if="errorMessage" class="error">{{ errorMessage }}</p> -->


        </form>
    </div>
    </body>
</template>

<script>
import axios from 'axios'
export default {
    name: "Login",
    
    data(){
        return {
           
            student_id:"",
            password:"",
            errorMessage: ""
        };
    },
    
    mounted(){
         let user = localStorage.getItem('user-info');
         if(user){
            this.$router.push({name:'Home'})
            }

     },
    methods:{
      
        async login(event){
          event.preventDefault();
          console.log('Sending student_id:', this.student_id);
          console.log('Sending password:', this.password);
          this.errorMessage = "";
           
           try{
             const response = await axios.post("http://localhost:3000/api/login",{
              student_id: this.student_id,
              password: this.password
              
            })
            
                const currentTime = new Date().getTime();
                localStorage.setItem('loginTime', currentTime);
                localStorage.removeItem('sessionExpired');

                localStorage.setItem('user-info', JSON.stringify(response.data.user));
                localStorage.setItem('course-data', JSON.stringify(response.data.courses));

                this.$router.push({name:'Home'})
            
            
           } catch(error){
              
              // Check for specific error response from the server
    
                if (error.response) {
                  if (error.response.status === 401) {
                    this.errorMessage = "Invalid student ID or password.";
                  } 
                  else if (error.response.status === 400) {
                     this.errorMessage = "Student ID and password are required.";
                  } 
                  else {
                      this.errorMessage = "An unexpected error occurred.";
                  }
                  console.error("Server error:", error.response.data); // Log the error for debugging
                  } 
                  else if (error.request) {
                  // If no response was received from the server
                    this.errorMessage = "No response from the server. Please try again later.";
                    console.error("Request error:", error.request);
                } 
                  else {
                  // If an error occurred in setting up the request
                  this.errorMessage = "Error setting up request. Please check your inputs.";
                  console.error("Error:", error.message);
                 }
      
           }
             

        },
      
    
    },
     
     
  };


</script>

<style scoped>
    @import "../assets/Login.css"
</style>