<template>
    <form action="">
        <header>
            <div class="Tugrade-Logo"></div>
            <div class="line-head">
                <p>Thammasat University</p>
                </div>   
            <ul class="Menu">
                <li><router-link to="/home">Home</router-link></li>
                <li><a>Calculator</a></li>
                <li><router-link to="/tracking">Tracking</router-link></li>
                <li><a v-on:click = "logout" href="#">Logout</a></li>
            </ul>
        </header>
        <div>
            <nav>
                <div class="Info-student">
                    <div class="Profile-icon"><i class='bx bx-user-circle'></i></div>
                    <div class="Profile-info">นายไกรสร เกริกไกร<br>คณะ วิศวกรรมศาสตร์</div>
                </div>
                
                <div class="Search-bar">
                    <input type="search" placeholder="ค้นหารายวิชา" required>
                    <button type="submit" class="bx bx-search" onclick="myFunction()"></button>
                </div>
                <div class="Filter"><i class='bx bx-filter'></i></div>
            </nav>
        </div>

        <table>
            <tr>
                <th class="no">ที่</th>
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
                    <div class="Attachments-file">ดูคะแนน</div>
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
                    <div class="Attachments-file">ดูคะแนน</div>
                </td>
            </tr>
            
        </table>
        


    </form>
</template>

<script>
export default {

}
</script>

<style>

</style>