<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>실패</title>
</head>
<body>
<h2>실패!</h2>
<p>${message}</p>

<!-- "확인" 버튼 클릭 시 이전 페이지로 이동 -->
<form action="/register" method="get">
    <button type="submit">확인</button>
</form>
</body>
</html>
