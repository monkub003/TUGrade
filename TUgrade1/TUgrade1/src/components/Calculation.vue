
<template>
  <form @submit.prevent="calculateGPA">
      <header>
          <nav class="Menubar">
              <router-link to="/home">
                <div class="Tugrade-Logo"></div>
              </router-link>
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
                  <li v-on:click="showSidebar()" class="Hamburger-btn"><a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                    </svg>
                  </a></li>
              </ul>
          </nav>
      </header>

      <h2 class="Calculation-head">ระบบคำนวณคะแนน</h2>
      <div class="course-list">
        <!-- <div class="course-header">
            <div class="course-name">รายชื่อวิชา</div>
            <div class="course-credit">หน่วยกิต</div>
            <div class="course-grade">เกรด</div>
        </div> -->
        <div class="cal-body">
          <div class="course-item" v-for="(course, index) in courses" :key="index">
            <div class="course-name">{{ course.course_name }}</div>
            <div class="course-credit">{{ course.credit }}</div>
            <div class="custom-select">
                <select v-model="course.grade">
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                </select>
            </div>
          </div>
        </div>
      </div>
      <div class="cal-calculation">
        <div class="cal-desired">
          <p class="text-topic">เกรดเฉลี่ยที่ต้องการ</p>
          <input class="text-output" type="number" v-model="desiredGPA" placeholder="เกรดเฉลี่ยที่ต้องการ" step="0.01" min="0" max="4">
          <button type="submit" class="text-result">คำนวณ</button>
        </div>
      </div> 
      <div class="cal-output">
        <div class="cal-desired">
          <p class="text-topic">GPA ที่คำนวณได้ </p>
          <p class="text-output">{{ result }}</p>
          <!-- <p class="text-result">{{ result_text }}</p> -->
        </div>
      </div> 
      
      <div class="cal-output">
        <p>{{ result_text }}</p>
      </div>
      
  </form>
</template>


<script>
export default {
  name: 'Calculation',
  data() {
      return {
          user: {
              first_name: '',
              last_name: ''
          },
          courses: [],
          desiredGPA: null,
          result: '',
          result_text: '',
          credit : '',
      };
  },
  methods: {
    logout()
        { 
          localStorage.removeItem('loginTime');
          
          console.warn("logout")
          localStorage.removeItem('user-info');
          localStorage.removeItem('course-data') 
          alert("You have been logged out.");
           
           this.$router.push({name:'Login'})
        },
        toggleMenu() 
        {
            this.isMenuOpen = !this.isMenuOpen;
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

              if (gradeValue!= null) {
                  totalCredits += credits;
                  totalPoints += credits * gradeValue;
              }
          });
          this.credit = `${totalCredits}`;
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
              'F': 0.0,
          };
          return gradePoints[grade]; 
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
  @import "../assets/Calculation.css"
</style>