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
        }
        else if(sideMenu.style.left === "0px"){
            closeSideMenu(); // 메뉴가 열려 있는 경우 닫도록 호출
        }
        else {
            sideMenu.style.left = "0"; // 좌측에서 보이도록 위치 변경
            sideMenu.classList.add('visible'); // 'visible' 클래스 추가하여 보이게 함
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


document.addEventListener("DOMContentLoaded", function() {
/*
  div사이즈 동적으로 구하기
*/
const outer = document.querySelector('.outer');
const innerList = document.querySelector('.inner-list');
const inners = document.querySelectorAll('.inner');
let currentIndex = 0; // 현재 슬라이드 화면 인덱스

inners.forEach((inner) => {
    inner.style.width = `${outer.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
})

innerList.style.width = `${outer.clientWidth * inners.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

/*
  버튼에 이벤트 등록하기
*/
const buttonLeft = document.querySelector('.button-left');
const buttonRight = document.querySelector('.button-right');

buttonLeft.addEventListener('click', () => {
    currentIndex--;
    currentIndex = currentIndex < 0 ? 0 : currentIndex; // index값이 0보다 작아질 경우 0으로 변경
    innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
    clearInterval(interval); // 기존 동작되던 interval 제거
    interval = getInterval(); // 새로운 interval 등록
});

buttonRight.addEventListener('click', () => {
    currentIndex++;
    currentIndex = currentIndex >= inners.length ? inners.length - 1 : currentIndex; // index값이 inner의 총 개수보다 많아질 경우 마지막 인덱스값으로 변경
    innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
    clearInterval(interval); // 기존 동작되던 interval 제거
    interval = getInterval(); // 새로운 interval 등록
});

/*
  주기적으로 화면 넘기기
*/
const getInterval = () => {
    return setInterval(() => {
        currentIndex++;
        currentIndex = currentIndex >= inners.length ? 0 : currentIndex;
        innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
    }, 2000);
}

let interval = getInterval(); // interval 등록
});




document.addEventListener("DOMContentLoaded", function() {
    /*
      div사이즈 동적으로 구하기
    */
    const outer = document.querySelector('.outer2');
    const innerList = document.querySelector('.inner-list2');
    const inners = document.querySelectorAll('.inner2');
    let currentIndex = 0; // 현재 슬라이드 화면 인덱스

    inners.forEach((inner) => {
        inner.style.width = `${outer.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
    })

    innerList.style.width = `${outer.clientWidth * inners.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

    /*
      버튼에 이벤트 등록하기
    */
    const buttonLeft = document.querySelector('.button-left2');
    const buttonRight = document.querySelector('.button-right2');

    buttonLeft.addEventListener('click', () => {
        currentIndex--;
        currentIndex = currentIndex < 0 ? 0 : currentIndex; // index값이 0보다 작아질 경우 0으로 변경
        innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
        clearInterval(interval); // 기존 동작되던 interval 제거
        interval = getInterval(); // 새로운 interval 등록
    });

    buttonRight.addEventListener('click', () => {
        currentIndex++;
        currentIndex = currentIndex >= inners.length ? inners.length - 1 : currentIndex; // index값이 inner의 총 개수보다 많아질 경우 마지막 인덱스값으로 변경
        innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
        clearInterval(interval); // 기존 동작되던 interval 제거
        interval = getInterval(); // 새로운 interval 등록
    });

    /*
      주기적으로 화면 넘기기
    */
    const getInterval = () => {
        return setInterval(() => {
            currentIndex++;
            currentIndex = currentIndex >= inners.length ? 0 : currentIndex;
            innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
        }, 2000);
    }

    let interval = getInterval(); // interval 등록
});

document.addEventListener("DOMContentLoaded", function() {
    /*
      div사이즈 동적으로 구하기
    */
    const outer = document.querySelector('.outer3');
    const innerList = document.querySelector('.inner-list3');
    const inners = document.querySelectorAll('.inner3');
    let currentIndex = 0; // 현재 슬라이드 화면 인덱스

    inners.forEach((inner) => {
        inner.style.width = `${outer.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
    })

    innerList.style.width = `${outer.clientWidth * inners.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

    /*
      버튼에 이벤트 등록하기
    */
    const buttonLeft = document.querySelector('.button-left3');
    const buttonRight = document.querySelector('.button-right3');

    buttonLeft.addEventListener('click', () => {
        currentIndex--;
        currentIndex = currentIndex < 0 ? 0 : currentIndex; // index값이 0보다 작아질 경우 0으로 변경
        innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
        clearInterval(interval); // 기존 동작되던 interval 제거
        interval = getInterval(); // 새로운 interval 등록
    });

    buttonRight.addEventListener('click', () => {
        currentIndex++;
        currentIndex = currentIndex >= inners.length ? inners.length - 1 : currentIndex; // index값이 inner의 총 개수보다 많아질 경우 마지막 인덱스값으로 변경
        innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
        clearInterval(interval); // 기존 동작되던 interval 제거
        interval = getInterval(); // 새로운 interval 등록
    });

    /*
      주기적으로 화면 넘기기
    */
    const getInterval = () => {
        return setInterval(() => {
            currentIndex++;
            currentIndex = currentIndex >= inners.length ? 0 : currentIndex;
            innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
        }, 2000);
    }

    let interval = getInterval(); // interval 등록
});

document.addEventListener("DOMContentLoaded", function() {
    /*
      div사이즈 동적으로 구하기
    */
    const outer = document.querySelector('.outer4');
    const innerList = document.querySelector('.inner-list4');
    const inners = document.querySelectorAll('.inner4');
    let currentIndex = 0; // 현재 슬라이드 화면 인덱스

    inners.forEach((inner) => {
        inner.style.width = `${outer.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
    })

    innerList.style.width = `${outer.clientWidth * inners.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

    /*
      버튼에 이벤트 등록하기
    */
    const buttonLeft = document.querySelector('.button-left4');
    const buttonRight = document.querySelector('.button-right4');

    buttonLeft.addEventListener('click', () => {
        currentIndex--;
        currentIndex = currentIndex < 0 ? 0 : currentIndex; // index값이 0보다 작아질 경우 0으로 변경
        innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
        clearInterval(interval); // 기존 동작되던 interval 제거
        interval = getInterval(); // 새로운 interval 등록
    });

    buttonRight.addEventListener('click', () => {
        currentIndex++;
        currentIndex = currentIndex >= inners.length ? inners.length - 1 : currentIndex; // index값이 inner의 총 개수보다 많아질 경우 마지막 인덱스값으로 변경
        innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
        clearInterval(interval); // 기존 동작되던 interval 제거
        interval = getInterval(); // 새로운 interval 등록
    });

    /*
      주기적으로 화면 넘기기
    */
    const getInterval = () => {
        return setInterval(() => {
            currentIndex++;
            currentIndex = currentIndex >= inners.length ? 0 : currentIndex;
            innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
        }, 2000);
    }

    let interval = getInterval(); // interval 등록
});

window.addEventListener('scroll', function() {
    var cylinder = document.querySelector('.cylinder');
    // 현재 스크롤 위치를 확인합니다.
    var scrollY = window.scrollY;

    // 스크롤이 일정 수준 이상 내려갔을 때 fixed 속성을 해제하고 absolute로 변경합니다.
    if (scrollY > 100) {
        cylinder.style.position = 'absolute';
        cylinder.style.top = scrollY + 'px';
    } else {
        // 스크롤이 위로 올라오면 다시 fixed로 설정합니다.
        cylinder.style.position = 'fixed';
        cylinder.style.top = '0';
    }
});