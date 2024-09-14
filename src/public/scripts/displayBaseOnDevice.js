function hasTouchSupport() {//test device have touch support( usually phone have it)
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
document.addEventListener('DOMContentLoaded', () => {
            const testDiv = document.getElementById('device test');
            // testDiv.textContent = navigator.userAgent;
            if (hasTouchSupport()) {//mobile
                // testDiv.textContent = hasTouchSupport() +  ' This is mobile';
                document.getElementById('mobile-content').style.display = 'block';
                document.getElementById('desktop-content').style.display = 'none';
            } else {
                // testDiv.textContent = hasTouchSupport()+ ' This is Desktop ';
                // console.log("Desktop device detected");
                document.getElementById('mobile-content').style.display = 'none';
                document.getElementById('desktop-content').style.display = 'block';
              }

            // if (isMobile) {
            //     document.getElementById('mobile-content').style.display = 'block';
            //     document.getElementById('desktop-content').style.display = 'none';
            // } else {
            //     document.getElementById('mobile-content').style.display = 'none';
            //     document.getElementById('desktop-content').style.display = 'block';
            // }
        });