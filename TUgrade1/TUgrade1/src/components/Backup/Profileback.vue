<template>
    <div>
    <header>
        <nav class="Menubar">
            <router-link to="/home"><div class="Tugrade-Logo"></div></router-link>
            <div class="line-head">
                <p>Thammasat University</p>
            </div>
            <ul class="Sidebar">
                <li v-on:click = "hideSidebar()"><a href="#" style="margin: 0 190px;"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a></li>
                <li><a><router-link to="/home">Home</router-link></a></li>
                <li><a><router-link to ="/calculation">Calculator</router-link></a></li>
                <li><a><router-link to="/tracking">Tracking</router-link></a></li>
                <li><a v-on:click = "logout" href="#" style="padding:0 34px">Logout</a></li>
            </ul>
            <ul class="Menu">
                <li><router-link to="/home">Home</router-link></li>
                <li><router-link to ="/calculation">Calculator</router-link></li>
                <li><router-link to="/tracking">Tracking</router-link></li>
                <li><a v-on:click = "logout" href="#">Logout</a></li>
                <li v-on:click="showSidebar()" class="Hamburger-btn"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></li>
            </ul>
        </nav>
    </header>

    <h2 class="Contact-head">ข้อมูลการติดต่อผู้สอน</h2>
    <div class= "Profile">
        <div class="Profile-pic"></div>
    </div>

    <div class="Professor-info">
        <div class="Professor-name">something</div>
        <div class="Professor-sector"></div>
    </div>

    <div class="Email">
        <div class="Email-icon"></div>
        <p>E-mail :</p>
        <p class="" id=""></p>
    </div>

    <div class="Office-room">
        <div class="Office-icon"></div>
        <p>ห้องสำนักงาน :</p>
        <p class="" id=""></p>
    </div>

    <div class="Note">
        <p>หมายเหตุ :</p>
        <p class="" id=""></p>
    </div>
</div>
</template>

<script>
export default {
    name : 'Profile',
    methods:{
        logout()
        { 
          localStorage.removeItem('loginTime');
          
          console.warn("logout")
          localStorage.removeItem('user-info');
          localStorage.removeItem('courses') 
          alert("You have been logged out.");
           
           this.$router.push({name:'Login'})
        },
        toggleMenu() 
        {
            this.isMenuOpen = !this.isMenuOpen;
        },
        showSidebar() {
                const Sidebar = document.querySelector('.Sidebar')
                Sidebar.style.display = 'flex'
            },
        hideSidebar() {
            const Sidebar = document.querySelector('.Sidebar')
            Sidebar.style.display = 'none'
        },
    },
}
</script>

<style>
    @import '../assets/Profile.css'
</style>