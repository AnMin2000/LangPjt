document.addEventListener("DOMContentLoaded", function() {
    var sideMenu = document.getElementById("sideMenu");
    var listIcon = document.getElementById("listIcon");

    // 아이콘 클릭 시 사이드 메뉴 토글
    listIcon.addEventListener("click", function(event) {
        event.stopPropagation(); // 이벤트 전파 방지
        toggleSideMenu();
    });

    // 사이드 메뉴 이외의 영역을 클릭했을 때 사이드 메뉴 닫기
    document.addEventListener("click", function(event) {
        var isClickedInsideMenu = sideMenu.contains(event.target);
        var isClickedOnIcon = event.target === listIcon;
        if (!isClickedInsideMenu && !isClickedOnIcon && sideMenu.classList.contains('visible')) {
            closeSideMenu(); // 메뉴 닫기
        }
    });

    // 사이드 메뉴 열고 닫는 함수
    function toggleSideMenu() {
        if (sideMenu.style.left === "-200px") { // 사이드 메뉴가 닫혀 있는 경우
            sideMenu.style.left = "0"; // 좌측에서 보이도록 위치 변경
            sideMenu.classList.add('visible'); // 'visible' 클래스 추가하여 보이게 함
        } else {
            closeSideMenu(); // 메뉴가 열려 있는 경우 닫도록 호출
        }
    }

    // 사이드 메뉴를 천천히 닫는 함수
    function closeSideMenu() {
        var opacity = 1; // 초기 투명도 설정
        var timerId = setInterval(function() {
            if (opacity > 0) { // 투명도가 0보다 클 때까지
                sideMenu.style.opacity = opacity; // 투명도 설정
                opacity -= 0.1; // 0.1씩 감소하여 천천히 투명해지도록 함
            } else {
                clearInterval(timerId); // setInterval 정지
                sideMenu.style.left = "-200px"; // 사이드 메뉴를 바로 숨기기 위해 좌측으로 위치 변경
                sideMenu.style.opacity = 1; // 투명도를 다시 1로 설정
                sideMenu.classList.remove('visible'); // 'visible' 클래스 제거하여 감춤
            }
        }, 50); // 50ms마다 반복하여 부드러운 애니메이션 효과를 적용
    }
});
