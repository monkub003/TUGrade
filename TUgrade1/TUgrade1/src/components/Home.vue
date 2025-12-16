<template>
    <form action="">
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
            <li v-on:click="hideSidebar()">
              <a href="#" style="margin: 0 190px;">
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
              </a>
            </li>
          <li><a><router-link to="/home">Home</router-link></a></li>
          <li><a><router-link to="/calculation">Calculator</router-link></a></li>
          <li><a><router-link to="/tracking">Tracking</router-link></a></li>
          <li><a v-on:click="logout" href="#" style="padding:0 34px">Logout</a></li>
          </ul>
          <ul class="Menu">
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/calculation">Calculator</router-link></li>
            <li><router-link to="/tracking">Tracking</router-link></li>
            <li><a v-on:click="logout">Logout</a></li>
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
      <div>
        <nav>
          <div class="Info-student">
            <div class="Profile-icon"><i class="bx bx-user-circle"></i></div>
            <div class="Profile-info">{{ user.first_name }} {{ user.last_name }}<br>คณะ{{ user.major }}</div>
          </div>
  
          <div class="Search-bar">
            <input type="search" v-model="searchQuery" placeholder="ค้นหารายวิชา" />
            <button @click.prevent="onSearch" class="bx bx-search"></button>
          </div>
          <div class="dropdown" @click="toggleDropdown">
            <i class='bx bx-filter'></i>
            <div class="dropdown-content" v-if="isDropdownOpen">
              <a v-for="semester in uniqueSemesters" :key="semester" @click.stop="selectSemester(semester)">
                {{ semester }}
              </a>
            </div>
          </div>
        </nav>
      </div>
  
      <table>
        <tbody>
          <tr>
            <th class="no">ลำดับที่</th>
            <th class="Course-code">รหัสวิชา</th>
            <th class="Course-name">ชื่อวิชา</th>
            <th class="Professor">อาจารย์ผู้สอน</th>
            <th class="Section">กลุ่มเรียน</th>
            <th class="Grade">เกรดที่ได้</th>
            <th class="Attachments"></th>
          </tr>
  
          <tr v-for="(course, index) in filteredCourses" :key="index">
            <td class="no">{{ index + 1 }}</td>
            <td class="Course-code">{{ course.course_name }}</td>
            <td class="Course-name">{{ course.full_name }}</td>
            <td class="Professor">{{ course.teacher_name }}</td>
            <td class="Section">{{ course.Section }}</td>
            <td class="Grade">{{ determineGrade(calculateTotalScore(course), course.grade_data) }}</td>
            <td class="Attachments">
              <button class="Attachments-file" v-on:click="sendCourse(course.course_name)">ดูคะแนน</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
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
        uniqueSemesters: [], // Array for unique semesters
        searchQuery: '', // Added for search input
        filteredCourses: [], // Holds the filtered search results
        isDropdownOpen: false // Control the dropdown visibility
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
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown visibility
      },
      showSidebar() {
        const Sidebar = document.querySelector('.Sidebar');
        Sidebar.style.display = 'flex';
      },
      hideSidebar() {
        const Sidebar = document.querySelector('.Sidebar');
        Sidebar.style.display = 'none';
      },
      calculateTotalScore(course) {
        const studentScore = course.student_scores;
        const Midterm = studentScore.midterm_score || 0; // Fallback to 0 if undefined
        const Final = studentScore.final_score || 0; // Fallback to 0 if undefined
        const Others = studentScore.others || 0; // Fallback to 0 if undefined
        return Midterm + Final + Others;
      },
      determineGrade(totalScore, gradeData) {
        if (totalScore >= gradeData.A) return 'A';
        if (totalScore >= gradeData.B_plus) return 'B+';
        if (totalScore >= gradeData.B) return 'B';
        if (totalScore >= gradeData.C_plus) return 'C+';
        if (totalScore >= gradeData.C) return 'C';
        if (totalScore >= gradeData.D_plus) return 'D+';
        if (totalScore >= gradeData.D) return 'D';
        return 'F';
      },
      onSearch() {
        // Filter courses based on the search query and update filteredCourses
        this.filteredCourses = this.courses.filter(course => {
        const query = this.searchQuery.toLowerCase();
        return (
          course.course_name.toLowerCase().includes(query) ||
          course.full_name.toLowerCase().includes(query) ||
          course.Section.toString().toLowerCase().includes(query) ||
          course.teacher_name.toLowerCase().includes(query)
        );
        });
        console.log("Searching for:", this.searchQuery);
      },
      selectSemester(semester) {
        // Filter courses based on selected semester
        this.filteredCourses = this.courses.filter(course => course.Semester === semester);
        this.isDropdownOpen = false; // Close dropdown after selection
        console.log(`Selected Semester: ${semester}`);
      },
      sendCourse(courseName){
            this.$router.push({name:'Score',query: { courseName: courseName } });
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
        this.filteredCourses = coursesData; // Initialize filteredCourses with all courses
  
        // Get unique semesters from courses
        const semesters = coursesData.map(course => course.Semester);
        this.uniqueSemesters = [...new Set(semesters)]; // Remove duplicates
      } else {
        console.warn("No courses data found in localStorage");
      }
    }
  };
  </script>
  
  <style scoped>
  @import "../assets/Home.css";
  
  
  </style>
  