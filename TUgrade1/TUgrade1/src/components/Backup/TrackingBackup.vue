<template>
    <div>
        <header>
          <nav class="Menubar">
              <router-link to="/home"><div class="Tugrade-Logo"></div></router-link>
              <div class="line-head">
                  <p>Thammasat University</p>
              </div>
              <ul class="Sidebar">
                  <li v-on:click="hideSidebar()"><a href="#" style="margin: 0 190px;">
                    <!-- SVG icon -->
                  </a></li>
                  <li><a><router-link to="/home">Home</router-link></a></li>
                  <li><a><router-link to="/calculation">Calculator</router-link></a></li>
                  <li><a><router-link to="/tracking">Tracking</router-link></a></li>
                  <li><a v-on:click="logout" href="#" style="padding:0 34px">Logout</a></li>
              </ul>
              <ul class="Menu">
                  <li><router-link to="/home">Home</router-link></li>
                  <li><a>Calculator</a></li>
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
      <div class="course-item" v-for="(course, index) in courses" :key="index">
      <div class="Tracking-box">
        <div class="Course-code-name">
          <p>วิชา :</p>
          <p>{{ course.course_name }}</p>
        </div>
        <div class="Professor">
          <p>อาจารย์ผู้สอน :</p>
          <p>{{ professorName }}</p>
        </div>
        <div class="Date">
          <p>วันที่ยื่นทบทวน :</p>
          <p>{{ reviewDate }}</p>
        </div>
        <div class="Status">
          <p>สถานะ :</p>
          <p>
            <i class="bx bxs-circle"></i>
            <span class="Status-description">{{ statusDescription }}</span>
          </p>
          
          <p>โปรดดูรายละเอียดเพิ่มเติม</p>
          <a  href="https://www.usmagazine.com/wp-content/uploads/2019/11/Celebrities-Who-Became-Memes-01.jpg?quality=86&strip=all" target="_blank"><button class="Attachments-file" @click="viewDetails">
            รายละเอียด
          </button></a>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  
  
  
  
  <script>
  export default {
    name: 'Home',
    data() {
        return {
            user: {
                first_name: '',
                last_name: ''
            },
            courses: [],
            desiredGPA: null,
            result: '',
            result: ''
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
        calculateGPA() {
            let totalCredits = 0;
            let totalPoints = 0;
  
            this.courses.forEach(course => {
                const credits = course.credit;
                const gradeValue = this.getGradeValue(course.grade);
  
                if (gradeValue !== null) {
                    totalCredits += credits;
                    totalPoints += credits * gradeValue;
                }
            });
  
            const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
            this.result = ` ${gpa.toFixed(2)}`;
            this.result_text = this.desiredGPA <= gpa ? "You can do it!" : "Impossible";
        },
        getGradeValue(grade) {
            const gradePoints = {
                'A': 4.0,
                'B+': 3.5,
                'B': 3.0,
                'C+': 2.5,
                'C': 2.0,
                'D+': 1.5,
                'D': 1.0,
                'F': 0.0
            };
            return gradePoints[grade] || null; // คืนค่าที่ตรงกัน หรือ null หากไม่พบ
        }
    },
    mounted() {
        const userData = JSON.parse(localStorage.getItem('user-info'));
        if (userData) {
            this.user = userData;
        }
  
        const coursesData = JSON.parse(localStorage.getItem('course-data'));
        if (coursesData) {
            this.courses = coursesData;
        } else {
            console.warn("No courses data found in localStorage");
        }
    }
  }
  </script>
  
  
  <style scoped>
    @import "../assets/Tracking.css"
  </style>