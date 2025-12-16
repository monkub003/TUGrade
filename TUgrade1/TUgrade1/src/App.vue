
<template>
    
  <router-view/>

</template>
    
<script>

export default {
  name: 'App',
  mounted() {

    window.addEventListener('beforeunload', this.onTabClose);
     
    this.checkSession();
  },
  methods: {
    onTabClose() {
      const closeTime = new Date().getTime();
      localStorage.setItem('closeTime', closeTime);
    },
    checkSession() {
      const loginTime = localStorage.getItem('loginTime');
      const closeTime = localStorage.getItem('closeTime');
      const currentTime = new Date().getTime();
    if (closeTime) {
        const timeElapsed = currentTime - closeTime;

        // If the user has closed the tab for more than 1 hour, expire the session
        if (timeElapsed > 3600000) { // 1 hour 
          
          localStorage.setItem('sessionExpired', true);  
          localStorage.clear();      
          
          localStorage.setItem('closeTime', closeTime);
          this.$router.push({name:'Login'})
        } else {
          // If the tab was closed for less than 1 hour, continue the session
          localStorage.removeItem('sessionExpired');
        
        }
      }   
    }
  },
  beforeDestroy() {
    // Remove the event listener 
    window.removeEventListener('beforeunload', this.onTabClose);
  }
};

</script>

<style scoped>

</style>
