<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>시작화면</title>
    <style>
        h1 { text-align: center; }
        h2 {
            text-align: left;
            font-family: 'Arial', sans-serif; /* 아리알 글씨체 변경 */
            font-weight: 800; /* bold처리 */
            margin-left: 50px;
        }
        h3 {
            font-size: 80px;
            color: #ffffff;
            margin-left: 160px; /* 왼쪽 여백 추가 */
            margin-top : 100px;
        }
        h4 {
            font-size: 50px;
            color: rgb(149, 165, 166);
            margin-left: 160px; /* 왼쪽 여백 추가 */
            margin-top : 25px;
        }
        .startBtn{
            border: none; /* 태두리 투명 */
            border-radius: 60px; /* 원하는 값으로 조절해주세요 */
            padding: 10px; /* 모양을 개선하기 위해 안쪽에 여백을 추가합니다 */
            width: 200px;
            height: 60px; /* 원하는 세로 길이를 설정합니다 */
            background-color: rgb(255, 255, 255); /* 박스의 배경색 */
            margin-left: 160px; /* 왼쪽 여백 추가 */
        }
        .startBtn2{
            color: white; /* 글자색을 하얀색으로 설정 */
            display: flex;
            border: none; /* 태두리 투명 */
            border-radius: 50px; /* 원하는 값으로 조절해주세요 */
            padding: 10px; /* 모양을 개선하기 위해 안쪽에 여백을 추가합니다 */
            width: 150px; /* 원하는 너비를 설정합니다 */
            height: 50px; /* 원하는 세로 길이를 설정합니다 */
            background-color: #1c49ff; /* 박스의 배경색 */
            overflow: hidden; /* 내용이 넘칠 경우를 대비하여 숨김 처리합니다 */
            justify-content: center; /* 수평 가운데 정렬 */
            align-items: center; /* 수직 가운데 정렬 */
            position: absolute; /*본인이 자식 클래스다!*/
            top: 50%;
            left: 90%; /*부모의 크기만큼 이동*/
            transform: translate(-50%, -50%); /*본인 크기 50프로 만큼 이동*/
        }
        img {
            width: 30px; /* 이미지의 폭을 20px로 설정하여 크기를 조절합니다 */
            height: auto; /* 가로 비율을 유지하면서 이미지의 높이를 자동으로 조절합니다 */
            margin-right: 5px; /* 텍스트와 이미지 사이에 여백을 줍니다 */
        }
        .cylinder {
            border: none; /* 태두리 투명 */
            border-radius: 40px; /* 원하는 값으로 조절해주세요 */
            padding: 10px; /* 모양을 개선하기 위해 안쪽에 여백을 추가합니다 */
            width: 1500px; /* 원하는 너비를 설정합니다 */
            height: 40px; /* 원하는 세로 길이를 설정합니다 */
            background-color: #ffffff; /* 박스의 배경색 */
            overflow: visible; /* 내용이 넘칠 경우를 대비하여 숨김 처리합니다 */
            margin: 50px auto 0; /*가운데 정렬*/
            position: relative; /* 위치를 지정합니다 본인이 부모 클래스다.!*/
        }
        .loginCylinder{
            color: white; /* 글자색을 하얀색으로 설정 */
            display: flex;
            border: none; /* 태두리 투명 */
            border-radius: 32px; /* 원하는 값으로 조절해주세요 */
            padding: 10px; /* 모양을 개선하기 위해 안쪽에 여백을 추가합니다 */
            width: 150px; /* 원하는 너비를 설정합니다 */
            height: 32px; /* 원하는 세로 길이를 설정합니다 */
            background-color: #1c49ff; /* 박스의 배경색 */
            overflow: hidden; /* 내용이 넘칠 경우를 대비하여 숨김 처리합니다 */
            justify-content: center; /* 수평 가운데 정렬 */
            align-items: center; /* 수직 가운데 정렬 */
            position: absolute; /*본인이 자식 클래스다!*/
            top: 50%;
            left: 90%; /*부모의 크기만큼 이동*/
            transform: translate(-50%, -50%); /*본인 크기 50프로 만큼 이동*/
        }
        .cylinder .content {
            position: absolute; /* 위치 지정 */
            top: 50%; /* 상단 여백을 높이의 절반으로 설정 */
            transform: translateY(-50%); /* 요소를 수직으로 가운데 정렬 */
            width: 100%; /* 요소의 너비 */
            text-align: center; /* 텍스트 가운데 정렬 */
        }
        ul,
        li {
            list-style-type: none;
            padding-left: 0;
            margin-left: 0;
        }

        button {
            font-family: 'Spoqa Han Sans Neo', 'sans-serif';
            font-size: 15px;
            line-height: 1;
            letter-spacing: -0.02em;
            color: #000000; /* 글씨 색 */
            background-color: rgba(224, 224, 224, 0);;
            border: none;
            cursor: pointer;
        }

        button:focus,
        button:active {
            outline: none;
            box-shadow: none;
        }
        .dropdown {
            position: relative;
            z-index: 1;
            width: 180px;
            margin-bottom: 8px;
            border: none; /* 태두리 투명 */
            border-radius: 32px; /* 원하는 값으로 조절해주세요 */
            padding: 10px; /* 모양을 개선하기 위해 안쪽에 여백을 추가합니다 */
            height: 32px; /* 원하는 세로 길이를 설정합니다 */
            background-color: rgb(224, 224, 224); /* 박스의 배경색 */
            overflow: visible; /* 내용이 넘칠 경우를 대비하여 숨김 처리합니다 */
            justify-content: center; /* 수평 가운데 정렬 */
            display: flex;
            align-items: center; /* 수직 가운데 정렬 */

            left: 75%; /*부모의 크기만큼 이동*/
            transform: translate(-50%, -10%); /*본인 크기 50프로 만큼 이동*/
        }

        .dropdown-toggle {
            display: flex;
            align-items: center; /* 수직 가운데 정렬 */
            width: 100%;
            height: 50px;
            padding: 0 16px;
            line-height: 50px;
            color: rgba(0, 0, 0, 0.5); /* 힌트 색 */
            text-align: left;
            border: 1px solid rgba(255, 255, 255, 0); /* 바깥 라인 투명하게 변경 */
            border-radius: 6px;
            transition: border-color 100ms ease-in;
        }
        .dropdown-toggle.selected {
            color: #3f4150;
            border-color: rgba(224, 226, 231, 1);
        }

        .dropdown-toggle:active {
            border-color: rgba(224, 226, 231, 1);
        }

        .dropdown-menu {
            position: absolute;
            z-index: 2;
            top: calc(70%);
            left: 0;
            width: 100%;
            max-height: 0;
            overflow: hidden;
            background-color: #fff;
            border: 1px solid transparent;
            border-radius: 6px;
            transition: border-color 200ms ease-in, padding 200ms ease-in,
            max-height 200ms ease-in, box-shadow 200ms ease-in;
        }

        .dropdown-menu.show {
            padding: 8px 0;
            max-height: 280px;
            border-color: rgba(255, 255, 255, 0);
            box-shadow: 0 4px 9px 0 rgba(63, 65, 80, 0.1);
        }

        .dropdown-option {
            width: 100%;
            height: 44px;
            padding: 0 16px;
            line-height: 44px;
            text-align: left;
        }

        .dropdown-option:hover {
            background-color: #f8f9fa;
        }

    </style>
</head>
<body style="background-color:#1c49ff;"> <!-- 배경색 바꾸기 -->

<div class="cylinder">

    <div class="content">
        <h2><img src="https://cdn-icons-png.flaticon.com/512/13611/13611575.png" alt="My Image">Tell</h2>
    </div>
    <form action="">
        <div class="dropdown">
            <button type="button" class="dropdown-toggle">
                <img src =https://cdn-icons-png.flaticon.com/512/5111/5111586.png alt="My image2">
                <strong>한국어</strong>
            </button>

            <ul class="dropdown-menu">
                <li class="dropdown-item">
                    <button type="button" value="1" class="dropdown-option">
                        <img src =https://cdn-icons-png.flaticon.com/512/5111/5111586.png alt="My image2">
                        <strong>한국어</strong>
                    </button>
                </li>
                <li class="dropdown-item">
                    <button type="button" value="2" class="dropdown-option">
                        <img src =https://cdn-icons-png.flaticon.com/128/323/323310.png alt="My image4">
                        <strong>영어</strong>
                    </button>
                </li>
                <li class="dropdown-item">
                    <button type="button" value="3" class="dropdown-option">
                        <img src =https://cdn-icons-png.flaticon.com/128/197/197604.png alt="My image5">
                        <strong>일본어</strong>
                    </button>
                </li>
            </ul>
            <img src =https://cdn-icons-png.flaticon.com/128/7709/7709971.png alt="My image3">
        </div>
    </form>
    <form action="/login" method="get">
    <button type="submit" class="startBtn2"> <strong>시작하기 >></strong> </button>
    </form>
    </div>

<h3>글로벌 의사소통의 시작<br>목소리로 표현하세요</h3>
<h4>혁신적인 학습 향상률<br>AI 튜터의 강력한 도움</h4>
<form action="/login" method="get">
<button type="submit" class="startBtn"> <strong>시작하기</strong></button>
</form>
<script>
    // 버튼 클릭 이벤트 핸들러 설정
    document.querySelector('.dropdown').addEventListener('click', function(event) {
        // 이벤트 전파 막기
        event.stopPropagation();
        // 여기에 클릭 이벤트 처리 코드를 추가하세요
    });
    const dropdown = document.querySelector('.dropdown')
    const toggleButton = document.querySelector('.dropdown-toggle')
    const menu = document.querySelector('.dropdown-menu')
    const options = document.querySelectorAll('.dropdown-option')
    const nextButton = document.querySelector('.next-button')

    toggleButton.addEventListener('click', function () {
        menu.classList.toggle('show')
    })

    toggleButton.addEventListener('blur', function () {
        menu.classList.remove('show')
    })

    options.forEach(function (item) {
        item.addEventListener('click', selectOption)
    })

    function selectOption() {
        const value = this.textContent.trim()
        toggleButton.textContent = value
        toggleButton.classList.add('selected')
        nextButton.removeAttribute('disabled')
    }

</script>
<!-- 에러 메시지 표시 -->
<c:if test="${not empty error}">
    <p style="color: red;">${error}</p>
</c:if>
</body>
</html>