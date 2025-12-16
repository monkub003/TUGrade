<template>
    <div>
    <header>
        <nav class="Menubar">
            <router-link to="/home"><div class="Tugrade-Logo"></div></router-link>
            <div class="line-head">
                <router-link to="/home">
                    <a class="Uni-Name">Thammasat University</a>
                </router-link>
            </div>
            <ul class="Sidebar">
                <li v-on:click = "hideSidebar()"><a href="#" style="margin: 0 190px;"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a></li>
                <li><a><router-link to="/home">Home</router-link></a></li>
                <li><a><router-link to ="/Score">Calculator</router-link></a></li>
                <li><a><router-link to="/tracking">Tracking</router-link></a></li>
                <li><a v-on:click = "logout" href="#" style="padding:0 34px">Logout</a></li>
            </ul>
            <ul class="Menu">
                <li><router-link to="/home">Home</router-link></li>
                <li><router-link to="/calculation">Calculator</router-link></li>
                <li><router-link to="/tracking">Tracking</router-link></li>
                <li><a v-on:click = "logout" href="#">Logout</a></li>
                <li v-on:click="showSidebar()" class="Hamburger-btn"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></li>
            </ul>
        </nav>
    </header>

    <h2 class="Contact-head">ข้อมูลการติดต่อผู้สอน</h2>
    <div class= "Profile">
        <div class="Profile-pic">
            <!-- <img src="../assets/images/ProfilePics/เฉิน_หลง.jpg" alt="Profile Picture" class="Profile-pic"> -->
            <img :src="profilePicture" alt="Profile Picture" class="Profile-pic">
        </div>
    </div>

    <div class="Professor-info">
        <div class="Professor-name"></div>
        <p>{{this.teacherName}}</p>
        <div class="Professor-sector"></div>
    </div>

    <div class="Email">
        <i class="fa fa-envelope">&nbsp;</i>
        <p>E-mail : {{this.Email}}</p>
        <!-- <p class="" id=""></p> -->
    </div>

    <div class="Office-room">
        <i class="fas fa-building">&nbsp;</i>
        <p>ห้องสำนักงาน : {{this.Office}}</p>
        <!-- <p class="" id=""></p> -->
    </div>

    <div class="Note">
        <p>หมายเหตุ : {{this.Note}}</p>
        <!-- <p class="" id=""></p> -->
    </div>
</div>
</template>

<script>
export default {
    name : 'Profile',
    data(){
        return{
            teacherName: this.$route.query.teacherName || '',
            courses: [],
            filteredCourse: null,
            Note: '',
            Office: '',
            Email: '',
            Tel: '',
            profilePicture: '',
        }
    },
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
        findCourse() {    
           if (this.teacherName) { 
                this.filteredCourse = this.courses.find(course => course.teacher_name.trim() === this.teacherName.trim());
                console.log("Filtered Course:", this.filteredCourse);
                console.log(this.filteredCourse.teacher_name);
             if (!this.filteredCourse) {
                console.warn("Course not found for the provided course name:", this.teacher_name);
            }
        } else {
            console.warn("teacherName is not defined");
            }
        },
        async loadProfilePic() {
            const teacher_name = this.teacherName.replace(/\s/g, '_');
            const profile_path = `../assets/images/ProfilePics/${teacher_name}.jpg`;
            // const profile_path = '@/assets/images/ProfilePics/ผู.jpg';
            console.log("teacher test: ", profile_path);
            const image = await import(profile_path);
            this.profilePicture = image.default;
        },
    },
    mounted(){
        console.log("teacher" , this.teacherName);
        const coursesData = JSON.parse(localStorage.getItem('course-data'));

        if (coursesData) {           
            this.courses = coursesData;
            console.log("yeah ", this.profilePicture);
            this.findCourse();
            this.Note = this.filteredCourse.note;
            this.Office = this.filteredCourse.office;
            this.Email = this.filteredCourse.email;
            console.log("Note:", this.Note); 
            this.loadProfilePic();
                     
        } else {

            console.warn("No courses data found in localStorage");
        }
    },
}
</script>

<style>
    @import '../assets/Profile.css'
</style>