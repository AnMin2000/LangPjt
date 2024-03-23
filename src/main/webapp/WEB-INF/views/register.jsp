<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>회원가입</title>
    <style>
        h1 { text-align: center; }
        h2 { text-align: left; }
        #id, #pw, #pw2, #name, #phone {
            border: none; /* 태두리 투명 */
            border-radius: 20px; /* 원하는 값으로 조절해주세요 */
            padding: 10px; /* 모양을 개선하기 위해 안쪽에 여백을 추가합니다 */
            width: 400px; /* 원하는 너비를 설정합니다 */
            height: 20px; /* 원하는 세로 길이를 설정합니다 */
            outline: none; /* 클릭 시 기본 테두리 제거 */
            font-size: 16px; /* 텍스트 글자 크기를 설정합니다 */
        }
        button {
            background-color: blue; /* 파란색 배경을 설정합니다 */
            color: white; /* 텍스트 색상을 흰색으로 설정합니다 */
            border: none; /* 테두리를 제거합니다 */
            border-radius: 20px; /* 원하는 값으로 조절해주세요 */
            padding: 10px; /* 버튼 내부 여백을 조절합니다 */
            width : 420px; /* 가로 */
            height: 40px; /* 세로 */
            font-size: 20px; /* 버튼 텍스트의 글자 크기를 설정합니다 */
            font-weight: bold; /* 버튼 텍스트를 굵게 만듭니다 */
            cursor: pointer; /* 마우스 커서를 포인터로 변경하여 클릭 가능한 상태로 만듭니다 */
            line-height: 1; /* 버튼 내부 텍스트의 세로 가운데 정렬을 위해 사용합니다 */
        }
        h2 {
            font-family: 'Arial', sans-serif; /* 아리알 글씨체 변경 */
            font-weight: 800; /* bold처리 */
            margin-left: 300px;
        }
        img {
            width: 30px; /* 이미지의 폭을 20px로 설정하여 크기를 조절합니다 */
            height: auto; /* 가로 비율을 유지하면서 이미지의 높이를 자동으로 조절합니다 */
            margin-right: 5px; /* 텍스트와 이미지 사이에 여백을 줍니다 */
        }
    </style>
</head>
<body style="background-color:#eae7e7;"> <!-- 배경색 바꾸기 -->

<h2><br><br>
    <img src="https://cdn-icons-png.flaticon.com/512/13611/13611575.png" alt="My Image">Tell</h2>
<h1><br><br>개인정보를 입력해주세요</h1>

<!-- 회원가입 폼 -->

<form action="/register" method="post" style="text-align: center;">

    <input type="text" id="id" name="id" placeholder="아이디" required><br><br> <!-- name이 controller에서 받는 매개변수 값 -->

    <input type="password" id="pw" name="pw" placeholder="비밀번호" required><br><br>
    <input type="password" id="pw2" name="pw2" placeholder="비밀번호 확인" required><br><br>

    <input type="text" id="name" name="name" placeholder="이름" required><br><br>
    <input type="text" id="phone" name="phone" placeholder="전화번호" required><br><br>
    <button type="submit">회원 가입하기</button>
</form>


<!-- 에러 메시지 표시 -->
<c:if test="${not empty error}">
    <p style="color: red;">${error}</p>
</c:if>
</body>
</html>