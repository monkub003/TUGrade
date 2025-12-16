<template>
    <body>
    <div class="wrapper-login">
        <form action="">
            <div class="Tugrade-Logo"></div>
            <h1>Thammasat University student’s grades</h1>
            <h2>ระบบประกาศคะแนนและเกรด</h2>

            <div class="input_form">
                <i class='bx bxs-user'></i>
                <input type="text" placeholder="รหัสนักศึกษา" v-model = "userid" required>
            </div>

            <div class="input_form">
                <i class='bx bxs-lock-alt'></i>
                <input type="password" placeholder="รหัสผ่าน" v-model = "password" required>
            </div>

            <button type="submit" class="login-btn" v-on:click="login">เข้าสู่ระบบ</button>
            <!-- <router-link to="/home">เข้าสู่ระบบ</router-link> //For Testing only -->
            <p>สำหรับนักศึกษามหาวิทยาลัยธรรมศาสตร์เท่านั้น</p>
            


        </form>
    </div>
    </body>
</template>

<script>
import axios from 'axios'
export default {
    name: "login",
    data(){
        return {
            userid:'',
            password:''
        }
    },
    computed: {
    isValidForm() {
      return this.userid && this.password; // Returns true only if both fields are filled
    }
  },

    methods:{
        async login(){
            let result = await axios.get(
                `http://localhost:3000/user?userid=${this.userid}&password=${this.password}`
            )
            if(result.status==200 && result.data.length>0 && this.isValidForm)
            {
                localStorage.setItem("user-info",JSON.stringify(result.data[0]))
                this.$router.push({name:'Home'})
            }
            else{
                alert("รหัสนักศึกษาหรือรหัสผ่านไม่ถูกต้อง");
            }

            console.warn(result)

        }
    },
     mounted(){
        document.title = 'Login - TUGrade';
         let user = localStorage.getItem('user-info');
         if(user)
         {
            this.$router.push({name:'Home'})
        }
     }

}

</script>

<style scoped>
    @import "../assets/Login.css"
</style>