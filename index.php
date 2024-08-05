<?php
session_start();
if (!isset($_SESSION['user-access'])) { //if login in session is not set
    header("Location: login.php");
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
    <link href="css/index.css" rel="stylesheet" type="text/css">
    <!-- <link href="css/style.css" rel="stylesheet" type="text/css"> -->
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/jquery-ui.css" />



    <!-- Responsive datatable examples -->
    <link href="css/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/select/1.3.1/css/select.bootstrap4.min.css" />

    <!-- <link rel="stylesheet" href="https://nightly.datatables.net/css/dataTables.bootstrap4.min.css"> -->

    <!-- Sweet Alert -->
    <link href="css/sweetalert2.css" rel="stylesheet" type="text/css">
    <link href="css/waitMe.css" rel="stylesheet" type="text/css">

    <link rel="stylesheet" type="text/css" media="all" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/smoothness/jquery-ui.css" />


    <title>Home</title>
</head>

<body>

    <div id="index-wrapper" class="index-wrapper d-flex flex-column">
        <div class="">
            <div class="nav-bar sticky-top">
                <div class="header-logout">
                    <div class="w-100 h-100 d-flex justify-content-center align-items-center">
                        <img class="logout-icon" src="assets\icons\logout-icon.svg" alt="">

                        <div class="logout-text">Log out</div>
                    </div>
                </div>
                <div class="header-wrapper d-flex justify-content-between">
                    <div class="logo-wrapper d-flex align-items-center flex-row">
                        <div class="logo">
                            <img src="assets\icons\header-logo.png" alt="">
                        </div>
                        <div class="header-title">
                            <h1>Prepaid Card Distribution Portal</h1>
                        </div>

                        <a href="">
                            <div class="dashboard d-flex align-items-center justify-content-center">
                                <img class="home-icon" src="assets\icons\home-icon.svg" alt="">
                                <div class="d-inline-block">Home</div>

                            </div>
                        </a>
                    </div>
                    <div class="session d-flex align-items-center">
                        <div class="session-details d-flex flex-column">
                            <div class="username"></div>
                            <div class="user-role"></div>
                        </div>
                        <div>
                            <a class="menu-button" href="#">
                                <img class="menu-icon" src="assets/icons/menu-icon.svg" alt="">
                            </a>

                        </div>



                    </div>


                </div>
            </div>



            <div class="summary-cards d-flex">
            <div class="total-cards-container d-flex justify-content-center align-items-center" >
                <div class="total-card d-flex flex-column justify-content-center align-items-center">
                    <div class="total-number">1231</div>
                    <div class="total-text">Total No. of Cards</div>
                </div>
            </div>
            <div class="other-cards d-flex align-items-center" >
                <div class="verified-card d-flex flex-column justify-content-center align-items-center">
                    <div class="verified-number">1231</div>
                    <div class="verified-text">Verified Cards</div>
                </div>
                <div class="unverified-card d-flex flex-column justify-content-center align-items-center">
                    <div class="unverified-number">1231</div>
                    <div class="unverified-text">Unverified Cards</div>
                </div>
                <div class="unresolved-card d-flex flex-column justify-content-center align-items-center">
                    <div class="unresolved-number">1231</div>
                    <div class="unresolved-text">Unresolved Cards</div>
                </div>
            </div>
            
        </div>
        </div>

        <div class="flag-index-content-wrapper">
            <div class="search-filter-container d-flex align-items-center justify-content-around">
                <div id="search" class="form-input ">
                    <input id="custom-search" class="myInput" required="" type="text" oninvalid="this.setCustomValidity('Username is required')" oninput="setCustomValidity('')">
                    <label class="myInput-label">Search</label>
                    <img class="search-icon" src="assets/icons/search-icon.svg" alt="">
                </div>

                <!-- <div id="location-filter" class="form-input ">
                    <select id="select-location" class="myInput2" required="" type="text" oninput="setCustomValidity('')">
                        <option value="all">All Villages</option>
                    </select>
                    <label class="myInput2-label">Filter Location</label>
                </div> -->

                <div id="status-filter" class="form-input ">
                    <select id="select-status" class="myInput4" aria-placeholder="All PCO's" required="" type="text" oninput="setCustomValidity('')">
                        <option value="total">All Cards</option>
                        <option value="unverified">Unverified</option>
                        <option value="verified">Verified</option>
                        <option value="unresolved">Unresolved</option>
                        <option value="unverified&verified"> Unverified & Verified</option>
                        <option value="unverified&unresolved"> Unverified & Unresolved</option>
                        <option value="verified&unresolved"> Verified & Unresolved</option>

                    </select>
                    <label class="myInput4-label">Card Status</label>
                </div>

                <button class="export-button d-flex align-items-center justify-content-center">
                    <img src="assets\icons\export-icon.png" alt=""></img>
                    <div>EXPORT TO EXCEL</div> 
                </button>

            </div>
            <div class="table-responsive">
                <table id="index-first-datatable" class="table dt-responsive  nowrap" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                    <thead>
                        <tr>
                            <th></th>
                            <th>HOLDER IK NO.</th>
                            <th>NAME</th>
                            <th>HUB</th>
                            <th>CARD BG ID</th>
                            <th>CARD PAN</th>
                            <th>DIST. FO ID</th>
                            <th>CARD STATUS</th>
                            <th></th>
                        </tr>
                    </thead>


                    <tbody id="index-first-data">

                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- <script src="https://kit.fontawesome.com/c50c8842df.js" crossorigin="anonymous"></script> -->
    <script src="js/jquery-1.11.1.min.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <script src="manual-js/main.js?c=61"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <script src="js/jquery.datepicker2.js"></script>
    <!-- Required datatable js -->
    <script src="js/jquery.dataTables.min.js"></script>
    <script src="js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/select/1.3.1/js/dataTables.select.min.js"></script>
    <!-- Buttons examples -->
    <script src="js/dataTables.buttons.min.js"></script>
    <script src="js/buttons.bootstrap4.min.js"></script>
    <script src="js/jszip.min.js"></script>
    <script src="js/pdfmake.min.js"></script>
    <script src="js/vfs_fonts.js"></script>
    <script src="js/buttons.html5.min.js"></script>
    <script src="js/buttons.print.min.js"></script>
    <script src="js/buttons.colVis.min.js"></script>
    <!-- Responsive examples -->
    <script src="js/dataTables.responsive.min.js"></script>
    <script src="js/responsive.bootstrap4.min.js"></script>
    <script src="js/waitMe.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
    <script src="https://cdn.datatables.net/plug-ins/1.10.19/dataRender/datetime.js"></script>



    <script src="js/sweetalert2.all.js"></script>
    <link rel="stylesheet" href="css/jquery.datepicker2.css">

    <script>
        var username = '<?php echo $_SESSION["user-id"] ?>';
        var role = '<?php echo $_SESSION["role"] ?>';
        console.log(role);


    </script>

</body>

</html>