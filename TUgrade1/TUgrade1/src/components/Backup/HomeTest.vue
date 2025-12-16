<template>
    <form action="">
        <header>
            <nav class="Menubar">
                <router-link to="/home"><div class="Tugrade-Logo"></div></router-link>
                <div class="line-head">
                    <p>Thammasat University</p>
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
                    <li><a>Calculator</a></li>
                    <li><router-link to="/tracking">Tracking</router-link></li>
                    <li><a v-on:click = "logout" href="#">Logout</a></li>
                    <li v-on:click="showSidebar()" class="Hamburger-btn"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></li>
                </ul>
            </nav>
        </header>
        <div>
            <nav>
                <div class="Info-student">
                    <div class="Profile-icon"><i class='bx bx-user-circle'></i></div>
                    <div class="Profile-info">{{ user.first_name }} {{ user.last_name }}<br>คณะ วิศวกรรมศาสตร์</div>
                </div>

                <div class="Search-bar">
                    <input type="search" placeholder="ค้นหารายวิชา" >
                    <button type="submit" class="bx bx-search" onclick="myFunction()"></button>
                </div>
                <div class="Filter"><i class='bx bx-filter'></i></div>
            </nav>
        </div>
        

        <table>
            <tr>
                <th class="no">ลำดับที่</th>
                <th class="Course-code">รหัสวิชา</th>
                <th class="Course-name">ชื่อวิชา</th>
                <th class="Professor">อาจารย์ผู้สอน</th>
                <th class="Section">กลุ่มเรียน</th>
                <th class="Grade">เกรดที่ได้</th>
                <th class="Attachments"></th>
            </tr>
            <tr>
                <td class="no">1</td>
                <td class="Course-code">CN210</td>
                <td class="Course-name">สถาปัตยกรรมคอมพิวเตอร์</td>
                <td class="Professor">ผู้ช่วยศาสตราจารย์ ดร.ศุภกิจ พฤษอรุณ</td>
                <td class="Section">760001</td>
                <td class="Grade">B+</td>
                <td class="Attachments">
                    <button class="Attachments-file">ดูคะแนน</button>
                </td>
                
            </tr>
            <tr>
                <td class="no">2</td>
                <td class="Course-code">SF221</td>
                <td class="Course-name">กระบวนการทางซอฟต์แวร์</td>
                <td class="Professor">ผู้ช่วยศาสตราจารย์ ดร.ปิยะ เตชะธีราวัฒน์</td>
                <td class="Section">760001</td>
                <td class="Grade">A</td>
                <td class="Attachments">
                    <button class="Attachments-file">ดูคะแนน</button>
                </td>
            </tr>
            
        </table>

        <!-- <div v-if="filteredCourses.length > 0">
            <ul>
                <li v-for="course in filteredCourses" :key="course.name">
                <h3>{{ course.name }}</h3>
                <p>Midterm Score: {{ course.midterm_score }}</p>
                <p>Final Score: {{ course.final_score }}</p>
                <p>Others: {{ course.others }}</p>
                </li>
            </ul>
        </div> -->


    </form>

</template>

<script>
export default {
    name :'Home',
    data() {
        return {
            user: {
                first_name: '', // Initialize with an empty string or default value
                last_name: ''
            },
            course: [],

        };
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
        async fetchCourses() {
      const studentId = JSON.parse(localStorage.getItem('user-info')).student_id;
      
        try {
          const response = await axios.get('http://localhost:3000/api/course/student/',{params : {studentId}});
          //console.log('Fetched courses:', response.data);
          this.courses = response.data; // Store the fetched courses
          
          localStorage.setItem('courses', JSON.stringify(response.data));
           this.filterCoursesForStudent();
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      
    },
      
    filterCoursesForStudent() {
      const courses = JSON.parse(localStorage.getItem('courses')); // Parse courses from localStorage
      const studentId = JSON.parse(localStorage.getItem('user-info')).student_id;
      
      
      if (!Array.isArray(courses)) {
        console.error('Courses data is not an array.');
        return;
      }

      // Filter and map the courses to only include the scores for the given studentId
      this.filteredCourses = courses.map(course => {

        const studentScore = course.students_score.find(score => score.student_id === studentId);
        
        return {
          name: course.name,
          midterm_score: studentScore ? studentScore.midterm_score : 'N/A',
          final_score: studentScore ? studentScore.final_score : 'N/A',
          others: studentScore ? studentScore.others : 'N/A',
        };
      }); 
        this.filteredCourses = this.filteredCourses.filter(course => course.midterm_score !== 'N/A');   
    },
    },

    mounted() {
    // Simulate API or localStorage data fetching
    const userData = JSON.parse(localStorage.getItem('user-info'));
    if (userData) {
      this.user = userData;
    }

    // Load courses from local storage or other state management
    const courses = JSON.parse(localStorage.getItem('course-data'));
    if (courses) {
      this.courses = courses;
    }
  }
}
</script>

<style scoped>
    @import "../assets/Home.css"
</style>