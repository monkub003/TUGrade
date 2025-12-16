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
                <li v-on:click="hideSidebar()"><a href="#" style="margin: 0 190px;">
                  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                  </svg>
                </a></li>
                <li><a><router-link to="/home">Home</router-link></a></li>
                <li><a><router-link to="/calculation">Calculator</router-link></a></li>
                <li><a><router-link to="/tracking">Tracking</router-link></a></li>
                <li><a v-on:click="logout" href="#" style="padding:0 34px">Logout</a></li>
              </ul>
              <ul class="Menu">
                <li><router-link to="/home">Home</router-link></li>
                <li><router-link to="/calculation">Calculator</router-link></li>
                <li><router-link to="/tracking">Tracking</router-link></li>
                <li><a v-on:click="logout" href="#">Logout</a></li>
                <li v-on:click="showSidebar()" class="Hamburger-btn">
                  <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                    </svg>
                  </a>
                </li>
              </ul>
          </nav>
      </header>
      
      <h2 class="Tracking-head">ติดตามผลการทบทวนคะแนน</h2>
      <div>

      </div>
      <div class="course-item" v-for="(course, index) in courses" :key="index">
      <div class="Tracking-box">
        <div class="Course-code-name">
          <p>วิชา : {{course.course_name}}</p>
          <p></p>
        </div>
        <div class="Professor">
          <p>อาจารย์ผู้สอน : {{course.teacher_name}}</p>
          <p></p>
        </div>
        <div class="Date">
          <p>วันที่ยื่นทบทวน : {{course.student_scores.kumrong}}</p>
          <p></p>
        </div>
        <div class="Status">
          <p>สถานะ :</p>
          <p>
            <i class="bx bxs-circle" :style="statusClass(course.student_scores.kumrong)"></i>
            <!-- :class="statusClass(course.student_scores.kumrong)" -->
            <span class="Status-description"></span>
          </p>
          
          <p v-if="course.student_scores.kumrong === 'สำเร็จ'">ดำเนินการเรียบร้อย&nbsp;&nbsp;&nbsp;&nbsp;โปรดดูรายละเอียดเพิ่มเติม</p>
          <p v-if="course.student_scores.kumrong !== 'สำเร็จ'">กำลังดำเนินการ</p>
          <a  href="https://www.usmagazine.com/wp-content/uploads/2019/11/Celebrities-Who-Became-Memes-01.jpg?quality=86&strip=all" target="_blank">
            <button class="Attachments-file" @click="viewDetails" v-if="course.student_scores.kumrong === 'สำเร็จ'">
            รายละเอียด
            </button>
          </a>
        </div>
      </div>
    </div>

    <div class="Not-found-text" v-if="courses.length === 0">ไม่พบคำร้อง</div>

  </div>
  </template>
  
  
  
  
  
  <script>
  import axios from 'axios';
  export default {
    name: 'Tracking',
    data() {
        return {
            user: {},
            courses: [],
            student_id:'',
            
            
        };
    },
    methods: {
        logout() {
            localStorage.removeItem('loginTime');
            localStorage.removeItem('user-info');
            localStorage.removeItem('course-data'); 
            alert("You have been logged out.");
            this.$router.push({ name: 'Login' });
        },
        showSidebar() {
            const Sidebar = document.querySelector('.Sidebar');
            Sidebar.style.display = 'flex';
        },
        hideSidebar() {
            const Sidebar = document.querySelector('.Sidebar');
            Sidebar.style.display = 'none';
        },
        async apiCourse() {
          const response = await axios.post("http://localhost:3000/api/courses", {
            student_id: this.student_id,
          });
          console.log("API Response:", response);
          
          // Filter courses where kumrong is not null or empty
          this.courses = response.data.filter(course => course.student_scores.kumrong && course.student_scores.kumrong.trim() !== '');
          
          console.log("Tracking API:", this.courses);
        },
        statusClass(status) {
            if (status === "สำเร็จ") {
              return 'color: #5adc0f';
            } else if (status === "") {
              return 'color: grey';
            } else {
              return 'color: orange'; // Default or unknown status
            }
        },
       
    },
    mounted() {

        const userData = JSON.parse(localStorage.getItem('user-info'));

        if (userData) {
            this.user = userData;   
            this.student_id = userData.student_id;  
            console.log("student_id",this.student_id)
        }
        
        this.apiCourse();

      }   
  }
  </script>
  
  
  <style scoped>
    @import "../assets/Tracking.css"
  </style>