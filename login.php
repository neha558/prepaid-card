<?php
session_start();
if (isset($_SESSION['user-access']) && $_SESSION['user-access'] === "true") { //if login in session is not set
    header("Location: index.php");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,600" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="css/metismenu.min.css" rel="stylesheet" type="text/css">
    <link href="css/icons.css" rel="stylesheet" type="text/css">
    <link href="css/login.css" rel="stylesheet" type="text/css">
    <!-- Sweet Alert -->
    <link href="css/sweetalert2.css" rel="stylesheet" type="text/css">
    <title>login</title>
</head>

<body>
        
    <div id="form-wrapper" class="form-wrapper d-flex flex-column align-items-center">
        <div id="failed-alert-container">
            <div class="failed-div">
                <img src="assets\icons\alert-icon.png" alt="" />
                <span>Invalid Username or Password</span>
            </div>
        </div>
        <div class="logo">
            <img src="assets\icons\prepaid-card-distribution-logo.png" alt="">
        </div>
        <div class="header">
            Prepaid Card Distribution Portal
        </div>

        <form action="javascript:void(0);">
            <div class="form-input ">
                <input id="username" class="myInput" required="" type="text" placeholder="Username" oninvalid="this.setCustomValidity('Username is required')" oninput="setCustomValidity('')">
                <label class="myInput-label">Username</label>
                <h6 style="color:red;text-align:left;display:none;" id="username-check">Username required.</h6>
            </div>

            <div class="form-input ">
                <input class="myInput" type="password" name="password" id="password" required="" placeholder="Password" oninvalid="this.setCustomValidity('Password is required')" oninput="setCustomValidity('')">
                <i class="d-inline far fa-eye fa-eye-slash" id="togglePassword"></i>
                <label class="myInput-label">Password</label>
                <h6 style="color:red;text-align:left;display:none;" id="password-check">Password required.</h6>
            </div>

            <div class="form-input ">
                <button id="login" class="btn login-submit">
                    Login
                </button>
            </div>

        </form>
        <div class="bg_logo align-items-center">
            <img src="assets\icons\Babban Gona Logo.svg" alt="">
        </div>

        <div class="version">
            V 1.0.0
        </div>
    </div>
    <!-- jQuery  -->
    <script src="https://kit.fontawesome.com/c50c8842df.js" crossorigin="anonymous"></script>
    <script src="js/jquery-1.11.1.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/metismenu.min.js"></script>
    <script src="js/jquery.slimscroll.js"></script>
    <script src="js/waves.min.js"></script>
    <script src="js/sweetalert2.all.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <script src="manual-js/login.js"></script>

    <script type="text/javascript">
        // const username='';
        // const password='';
        $(document).ready(function() {
            let username = '';
            let password = '';

            $("#username").focus(function() {
                $('#username-check').hide();

            });

            $("#password").focus(function() {
                $('#password-check').hide();
            });

            $('.login-submit').click(function() {

                $('#username-check').hide();
                $('#password-check').hide();
                var username = $('#username').val();
                var password = $('#password').val();
                console.log(username);
                console.log(password);


                if (username == "" || username == null) {
                    $('#username-check').show();
                } else if (password == "" || password == null) {
                    $('#password-check').show();
                } else {
                    $.ajax({
                        url: 'prepaid_card_distribution_slim/public/api/v1/session',
                        type: 'POST',

                        data: {
                            'use': "login",
                            'username': username,
                            'password': password
                        },
                        // dataType: "JSON",
                        success: function(response) {
                            console.log(response);
                            response = response.trim();


                            if (response == "error") {
                                swal({
                                    title: 'Error connecting to server.',
                                    type: 'info',
                                    showCancelButton: false,
                                    confirmButtonText: 'Okay'
                                });

                            } else if (response == "Login Unsuccessful") {
                                $('#failed-alert-container').addClass('d-block');
                                $("#username").focus();

                            } else if (response == "Login Successful") {
                                window.location.href = 'index.php';
                            } else {
                                swal({
                                    title: 'Error connecting to server.',
                                    type: 'info',
                                    showCancelButton: false,
                                    confirmButtonText: 'Okay'
                                });

                            }
                        }
                    });
                }
            });

        });
    </script>
</body>

</html>