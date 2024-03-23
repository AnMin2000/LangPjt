<%--ajax 회원가입 예제로 써본거--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>회원가입</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
<h2>회원가입</h2>
<form id="signupForm">
    <label for="username">사용자명:</label>
    <input type="text" id="username" name="username"><br><br>
    <label for="password">비밀번호:</label>
    <input type="password" id="password" name="password"><br><br>
    <button type="submit">가입</button>
</form>

<div id="response"></div>

<script>
    $(document).ready(function(){
        $("#signupForm").submit(function(event){
            event.preventDefault();
            var formData = {
                "username": $("#username").val(),
                "password": $("#password").val()
            };

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/signup",
                data: JSON.stringify(formData),
                dataType: 'json',
                success: function(data){
                    $("#response").html("<div>회원가입 성공!</div>");
                },
                error: function(e){
                    $("#response").html("<div>회원가입 실패!</div>");
                }
            });
        });
    });
</script>
</body>
</html>
