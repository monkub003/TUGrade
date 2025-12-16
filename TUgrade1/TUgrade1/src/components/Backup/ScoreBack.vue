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
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000">
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
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
  
      <div v-if="filteredCourse" class="Course-info">
        <h1 class="Course-code">{{ filteredCourse.course_name }} &nbsp;</h1>
        <h1 class="Course-name">{{ filteredCourse.full_name }}</h1>
      </div>
  
      <div v-else>
        <p>Course not found.</p>
      </div>
  
      <div class="container">
        <div class="pie-chart">
          <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
  
      <div class="Scores-bac">
        <table class="Scores" v-if="filteredCourse">
          <tbody>
            <tr>
              <th class="score-weight-header" colspan="2">สัดส่วนคะแนน</th>
              <th>คะแนนที่ได้</th>
            </tr>
            <tr>
              <td>สอบกลางภาค</td>
              <td>{{ filteredCourse.score_data.midterm }}%</td>
              <td>{{ filteredCourse.student_scores.midterm_score }}</td>
            </tr>
            <tr>
              <td>สอบปลายภาค</td>
              <td>{{ filteredCourse.score_data.final }}%</td>
              <td>{{ filteredCourse.student_scores.final_score }}</td>
            </tr>
            <tr>
              <td>อืนๆ</td>
              <td>{{ filteredCourse.score_data.others }}%</td>
              <td>{{ filteredCourse.student_scores.others }}</td>
            </tr>
          </tbody>
        </table>
  
        <div class="show-Grade">เกรดที่ได้
          <div class="get-grade">
            <img :src="gradeImage" alt="Grade Image" class="grade-image">
          </div>
        </div>
  
      </div>
  
      <div class="Footer">
        <button type="submit" class="review-Scores-btn" onclick="myFunction()">ขอทบทวนคะแนน</button>
        <a href="Home.html">ติดต่ออาจารย์</a>
      </div>
    </div>
  </template>
  
  <script>
  import VueApexCharts from "vue3-apexcharts";
  
  export default {
    name: 'Score',
    components: {
      apexchart: VueApexCharts,
    },
    data() {
      return {
        courseName: this.$route.query.courseName || '',    
        courses: [],
        filteredCourse: null,
        Final: 0,
        Midterm: 0,
        Other: 0,
        actualFinal: 0,
        grade: '',
        gradeImage: '',
        totalScore: 0,
        series: [], // Values for each slice
        chartOptions: {
          labels: ["Midterm", "Final", "Others"],
          chart: {
            type: "pie",
          },
          legend: {
            position: "right",
            horizontalAlign: "center",
            verticalAlign: "middle",
            floating: false,
            offsetY: 80,
          },
          colors: ['#C3002F', '#FC7F05', '#FFD13F' ],
        },
      };
    },
  
    methods: {
      logout() { 
        localStorage.removeItem('loginTime');
        console.warn("logout");
        localStorage.removeItem('user-info');
        localStorage.removeItem('courses');
        alert("You have been logged out.");
        this.$router.push({ name: 'Login' });
      },
      toggleMenu() {
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
      findCourse() {    
        if (this.courseName) { 
          this.filteredCourse = this.courses.find(course => course.course_name.trim() === this.courseName.trim());
          console.log("Filtered Course:", this.filteredCourse);
          if (!this.filteredCourse) {
            console.warn("Course not found for the provided course name:", this.courseName);
          }
        } else {
          console.warn("courseName is not defined");
        }
      },
      calculateTotalScore() {
        const studentScore = this.filteredCourse.student_scores;
        const Midterm = studentScore.midterm_score || 0; // Fallback to 0 if undefined
        const Final = studentScore.final_score || 0; // Fallback to 0 if undefined
        const Others = studentScore.others || 0; // Fallback to 0 if undefined
        return Midterm + Final + Others;
      },
      determineGrade(totalScore) {
        if (totalScore >= this.filteredCourse.grade_data.A) return 'A';
        else if (totalScore >= this.filteredCourse.grade_data.B_plus) return 'B+';
        else if (totalScore >= this.filteredCourse.grade_data.B) return 'B';
        else if (totalScore >= this.filteredCourse.grade_data.C_plus) return 'C+';
        else if (totalScore >= this.filteredCourse.grade_data.C) return 'C';
        else if (totalScore >= this.filteredCourse.grade_data.D_plus) return 'D+';
        else if (totalScore >= this.filteredCourse.grade_data.D) return 'D';
        else return 'F';
      },
      async loadGradeImage() {
        if (this.grade === 'A') {
          const image = await import('@/assets/images/grade_a.png');
          this.gradeImage = image.default;
        } else if (this.grade === 'B+') {
          const image = await import('@/assets/images/grade_bp.png');
          this.gradeImage = image.default;
        } else if (this.grade === 'B') {
          const image = await import('@/assets/images/grade_b.png');
          this.gradeImage = image.default;
        } else if (this.grade === 'C+') {
          const image = await import('@/assets/images/grade_cp.png');
          this.gradeImage = image.default;
        } else if (this.grade === 'C') {
          const image = await import('@/assets/images/grade_c.png');
          this.gradeImage = image.default;
        } else if (this.grade === 'D+') {
          const image = await import('@/assets/images/grade_dp.png');
          this.gradeImage = image.default;
        } else if (this.grade === 'D') {
          const image = await import('@/assets/images/grade_d.png');
          this.gradeImage = image.default;
        } else {
          const image = await import('@/assets/images/grade_f.png');
          this.gradeImage = image.default;
        }
      }
    },
  
    mounted() {
      const coursesData = JSON.parse(localStorage.getItem('course-data'));
      if (coursesData) {           
        this.courses = coursesData;
        console.log("All Courses Data:", this.courses);
        this.findCourse();
        if (this.filteredCourse) {
          this.totalScore = this.calculateTotalScore();
          this.grade = this.determineGrade(this.totalScore);
          console.log("Grade:", this.grade);
          console.log("Total Score:", this.totalScore);
          this.series = [this.filteredCourse.score_data.midterm, this.filteredCourse.score_data.final, this.filteredCourse.score_data.others];
          this.loadGradeImage();
        }
      } else {
        console.warn("No courses data found in localStorage");
      }
    }
  };
  </script>
  
  <style scoped>
  @import '../assets/Scores.css';
  </style>
  