(function($) {


    $(document).ready(function(){
        $('.username').html(username);
        $('.user-role').html(role);
        indexFirstLoad();
        loadFlagCount(role,hub);
       
    })


    //Toggle visibility of Logout on menu click
    const logout = document.querySelector(".header-logout");
    const menuButton = document.querySelector(".menu-button");

    menuButton.addEventListener('click', () => {
        // console.log("menu clicked")
        if(logout.classList.contains("active")){
            logout.classList.remove("active") 
        } else {
            logout.classList.add("active")
        }
    })



    //Logout function
    $('.header-logout').click(function() {
        $.ajax({
            url: 'prepaid_card_distribution_slim/public/api/v1/session',
            type: 'POST',
            data: { 'use': "logout" },
            // dataType: "JSON",
            success: function(response) {
                response = response.trim();


                if (response == "error") {
                    swal({
                        title: 'Error connecting to server.',
                        type: 'info',
                        showCancelButton: false,
                        confirmButtonText: 'Okay'
                    });

                } else {
                    window.location.href = 'login.php';

                }
            }
        });
    });

    //Function to load Flag count on Dashboard
    var loadFlagCount = function(role,hub){
        $('.index-wrapper').waitMe({
                        effect: 'bounce',
                        text: 'Loading...',
                        bg: 'rgba(255,255,255,0.7)',
                        color: '#000000',
                        maxSize: '',
                        textPos: 'vertical',
                        fontSize: '',
                        source: '',
                        onClose: function() {}
                    });
        $.ajax({
            url: "member_picture_verification_slim/public/api/v1/fetchFlagCount",
            type: "POST",
            data: {
                'role': role,
                'hub': hub,
            },
            success: function(response){
                // console.log(response);
                var count = JSON.parse(response);
                var captured = count.captured;
                var uncaptured = count.uncaptured;
                var approved = count.approved;
                var total = captured + uncaptured + approved;

                $('.captured .number').html(captured);
                $('.uncaptured .number').html(uncaptured);
                $('.approved .number').html(approved);
                $('.total .number').html(total);

                $('.index-wrapper').waitMe('hide');


            }
        })
    }


    //function to load index first table
    var indexFirstLoad = function() {
        console.log("This function was called");
        indexFirstTable = $('#index-first-datatable').DataTable({
            "dom": 'blrtip',

            ajax: {
                url: 'prepaid_card_distribution_slim/public/api/v1/fetchCards',
                type: 'GET',

                dataSrc: "",
                error: function(xhr, status, error) {
                    console.log(status);
                    console.log(xhr.responseText);
                },

                xhrFields: {
                    withCredentials: true
                },

                // success: function(response){
                //     console.log(response)
                // }
            },

            columns: [{
                    data: null,
                    defaultContent: '',
                    width: "4%"
                },
                {
                    width: "10%",
                    data: "holderIkNumber"
                },
                {
                    width: "15%",
                    data: "name"
                },
                {
                    width: "10%",
                    data: "hub"
                },
                {
                    width: "10%",
                    data: "cardBgId"
                },
                {
                    width: "12%",
                    data: "cardPan",
                    orderable: false
                },
                {
                    width: "12%",
                    data: "distFoId",
                    orderable: false
                },
                {
                    width: "12%",
                    data: "cardStatus",
                    orderable: false
                },
                {
                    width: "10%",
                    data: "summary",
                    orderable: false
                }

            ],
            lengthChange: false,
            aaSorting: [
                [3, "asc"]
            ],

            "searchCols": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],

            "deferRender": true,
            "paging":true,
            "info":true,
            "sorting":true,
            "pagingType": "full_numbers",
            "pageLength": 4,
            fixedHeader: true,

            aoColumnDefs: [{
                    aTargets: [0],
                    bSortable: false,
                    sClass: 'select-checkbox',
                },
                {
                    aTargets: [1],
                    mData: "holder IK Number",
                    mRender: function(data, type, full) {
                        return `<div class="div-bold">${data}</div>`;
                    }
                },
                {
                    aTargets: [3],
                    mData: "hub",
                    mRender: function(data, type, full) {
                        return `
                        <div class="table-location">
                            <span><img class="" src="assets/icons/location-icon.svg" alt=""></span> ${data}
                        </div>`;

                    }
                },
                {
                    aTargets: [6],
                    mData: "Dist FO ID",
                    mRender: function(data, type, full) {
                        return `<div class="div-bold">${data}</div>`;
                    }
                },
                {
                    aTargets: [7],
                    mData: "card status",
                    mRender: function(data, type, full) {
                        if (data == '0') {
                            return '<div class="unverified-div">Unverified</div>';
                        } else if (data == '1') {
                            return '<div class="verified-div">Verified</div>';
                        } else if (data == '2'){
                            return (
                                '<div class="unresolved-div">Unresolved</div>'
                                );
                        } else{
                            return;
                        }

                    }
                },
                {
                    aTargets: [8],
                    mData: "view icon",
                    mRender: function(data, type, full) {
                        return `<div class="view-icon"><a id="${data}" class="view_details" href="#"><img class="" src="assets/icons/view-icon.svg" alt=""></a></div>`;

                    }
                }

            ],
            select: {
                style: 'multi',
                selector: 'td:first-child'
            },
            order: [
                [1, 'asc']
            ]

        });

    };


    // Uncaptured card click
    $(document).on('click','a .uncaptured', function(){
        // console.log("uncaptured clicked...")
        $('.total').removeClass('captured-active')
        $('.captured').removeClass('captured-active')
        $('.approved').removeClass('approved-active')
        $('.uncaptured').addClass('uncaptured-active')
        $('#select-status').val('uncaptured')
        indexFirstTable.column( 4 ).search( 'uncaptured' ).draw();
    })


    // Captured card click
     $(document).on('click','a .captured', function(){
        // console.log("captured clicked...")
        $('.captured').addClass('captured-active')
        $('.approved').removeClass('approved-active')
        $('.uncaptured').removeClass('uncaptured-active')
        $('.total').removeClass('captured-active')
        $('#select-status').val('captured')



        regex = '\\b' + 'captured' + '\\b';
        indexFirstTable.column( 4 ).search( regex, true, false ).draw();
    })


    // Approved card click
    $(document).on('click','a .approved', function(){
        // console.log("approved clicked...")
        $('.approved').addClass('approved-active')
        $('.captured').removeClass('captured-active')
        $('.uncaptured').removeClass('uncaptured-active')
        $('.total').removeClass('captured-active')
        $('#select-status').val('approved')

        regex = '\\b' + 'approved' + '\\b';
        indexFirstTable.column( 4 ).search( regex, true, false ).draw();

    })

    //Total Card click
    $(document).on('click','a .total', function(){
        $('.total').addClass('captured-active')
        $('.approved').removeClass('approved-active')
        $('.captured').removeClass('captured-active')
        $('.uncaptured').removeClass('uncaptured-active')
        $('#select-status').val('total')

        regex = '[\s\S]*';
        indexFirstTable.column( 4 ).search( regex, true, false ).draw();

        
    })

    // Function for Search box
    $('#custom-search').on( 'keyup', function () {
    indexFirstTable.search( this.value ).draw();
    });

    $('.search-icon').on('click', function(){
        $('#custom-search').focus();
        $('.search-icon').addClass('d-none')
    })

    //Function to filter by Village
    $('#select-location').on('change', function() {
        if(this.value==='all'){
            regex = '[\s\S]*';
            indexFirstTable.column( 1 ).search( regex, true, false ).draw();
        } else {
            indexFirstTable.column( 1 ).search( this.value ).draw();

        }
    });


    //Function to filter by PCO
     $('#select-pco').on('change', function() {
        if(this.value==='all'){
            regex = '[\s\S]*';
            indexFirstTable.column( 5 ).search( regex, true, false ).draw();
        } else {
            indexFirstTable.column( 5 ).search( this.value ).draw();

        }
    });

    //Function to filter by status
     $('#select-status').on('change', function() {
        if(this.value==='uncaptured'){
            $('a .uncaptured').click();
        }else if(this.value==='captured'){
            $('a .captured').click();
        } else if(this.value==='approved'){
            $('a .approved').click();
        }else if(this.value==='total'){
            $('a .total').click();
        } else{
            $('.total').removeClass('captured-active')
            $('.approved').removeClass('approved-active')
            $('.captured').removeClass('captured-active')
            $('.uncaptured').removeClass('uncaptured-active')
            indexFirstTable.column( 4 ).search( 'captured' ).draw();
        }
        
    });

    //Function to go to home page
    $(document).on('click', '#home', function(){
        window.location= 'index.php';
    })



    // Function to load flag details page
    $(document).on('click', '.view_details', function(){
        var summary = $(this).attr('id');
        var summaryArray = summary.split('//');
        var unique_member_id = summaryArray[0];
        var flag_status = summaryArray[1];
        var ik_number = summaryArray[2];
        // console.log(summaryArray);
        switch(flag_status){
            case '0':
                window.location = `uncaptured.php?unique_member_id=${unique_member_id}&ik_number=${ik_number}`;
                break;
            case '1':
                window.location = `captured.php?unique_member_id=${unique_member_id}&ik_number=${ik_number}`;
                break;
            case '2':
                window.location = `approved.php?unique_member_id=${unique_member_id}&ik_number=${ik_number}`;
                break;
            default:
                break;

        }

    })

    // Function to view picture before flag in modal
    $(document).on('click', '#pbf-view', function(){
        var src = $('#pbf-image').attr('src');
        $('#modal-image-pbf').attr('src', src)
        var title = '<div class="image-header d-flex align-items-center justify-content-center w-100"><div class="header-text">Picture Before Flag</div></div>'
        var options = {
        title: title,
        html: $('#large-image-pbf'),
        showCancelButton: false,
        cancelButtonText: 'Close',
        showConfirmButton: false,
        customClass: 'swal-wide',
        animation: false
        };
        swal(options);
    })

     $(document).on('click', '#rp-view', function(){
        var src = $('#rp-image').attr('src');
        $('#modal-image-rp').attr('src', src)
        var title = '<div class="image-header d-flex align-items-center justify-content-center w-100"><div class="header-text">Recaptured Picture</div></div>'
        var options = {
        title: title,
        html: $('#large-image-rp'),
        showCancelButton: false,
        cancelButtonText: 'Close',
        showConfirmButton: false,
        customClass: 'swal-wide',
        animation: false
        };
        swal(options);
    })

     $(document).on('click', '#pfp-view', function(){
        var src = $('#pfp-image').attr('src');
        $('#modal-image-pfp').attr('src', src)
        var title = '<div class="image-header d-flex align-items-center justify-content-center w-100"><div class="header-text">Picture From PCO</div></div>'
        var options = {
        title: title,
        html: $('#large-image-pfp'),
        showCancelButton: false,
        cancelButtonText: 'Close',
        showConfirmButton: false,
        customClass: 'swal-wide',
        animation: false

        };
        swal(options);
    })


    //Functions to load when view & select button is clicked on captured details view..
     $(document).on('click', 'a#pbf-view-c', function(){
        var src = $('#pbf-image').attr('src');
        $('.modal-image').attr('src', src)
        var title = '<div class="image-header d-flex align-items-center justify-content-center w-100"><div class="header-text">Picture Before Flag</div></div>'
        // $('#large-image').append(image);
        var options = {
        title: title,
        html: $('#large-image-pbf'),
        showCancelButton: false,
        cancelButtonText: 'Close',
        showConfirmButton: false,
        customClass: 'swal-wide',
        animation: false

        };
        swal(options)
    })

    $(document).on('click', 'a#rp-view-c', function(){
        var src = $('#rp-image').attr('src');
        // var image = `<img src="${src}">`
        $('.modal-image').attr('src', src)
        var title = '<div class="image-header d-flex align-items-center justify-content-center w-100"><div class="header-text">Recaptured Picture</div></div>'
        // $('#large-image').append(image);
        var options = {
        title: title,
        html: $('#large-image-rp'),
        showCancelButton: false,
        cancelButtonText: 'Close',
        showConfirmButton: false,
        customClass: 'swal-wide',
        animation: false
        };
        swal(options)
    })

    $(document).on('click', 'a#pfp-view-c', function(){
        var src = $('#pfp-image').attr('src');
        // var image = `<img src="${src}">`
        $('.modal-image').attr('src', src)
        var title = '<div class="image-header d-flex align-items-center justify-content-center w-100"><div class="header-text">Picture From PCO</div></div>'
        // $('#large-image').append(image);
        var options = {
        title: title,
        html: $('#large-image-pfp'),
        showCancelButton: false,
        cancelButtonText: 'Close',
        showConfirmButton: false,
        customClass: 'swal-wide',
        animation: false
        };
        swal(options)
    })

    $(document).on('click', '.button-group a#close', function(){
        swal.close();
    })

   // Click select button in the pbf modal
     $(document).on('click', '#selection-pbf', function(){
        resetPFP();
        resetRP();


        if($('#modal-button-pbf').hasClass('selected')){
            resetPBF();

            $('#picture-before-flag').prop("checked", false)

        } else{
            $('div#modal-button-pbf').addClass('selected')
            $('#modal-button-pbf #button-text-pbf').text('deselect')
            $('#modal-button-pbf img').attr('src', 'assets/icons/cancel-icon-white.svg')
            $('#pbf-alert #selected-notice-pbf').removeClass('d-none')

            $('#image-header-pbf').addClass('header-selected')
            $('div#image-header-pbf > #header-text-pbf').addClass('header-selected-text')

            //To change the view & Select button to selected when picture is chosen
            $('div#view-select-pbf').addClass('view-select-selected')
            $('div#view-select-pbf img').attr('src', 'assets/icons/checked-icon-green.svg')
            $('div#view-select-pbf span').text('Selected')

            $('#picture-before-flag').prop("checked", true)


        }
    })

    //Click select button in the rp modal
    $(document).on('click', '#selection-rp', function(){
        resetPBF();
        resetPFP();


        if($('#modal-button-rp').hasClass('selected')){
            resetRP();

            $('#recaptured-picture').prop("checked", false)



        } else{
            $('div#modal-button-rp').addClass('selected')
            $('#modal-button-rp #button-text-rp').text('deselect')
            $('#modal-button-rp img').attr('src', 'assets/icons/cancel-icon-white.svg')
            $('#rp-alert #selected-notice-rp').removeClass('d-none')

            $('#image-header-rp').addClass('header-selected')
            $('div#image-header-rp > #header-text-rp').addClass('header-selected-text')

            //To change the view & Select button to selected when picture is chosen
            $('div#view-select-rp').addClass('view-select-selected')
            $('div#view-select-rp img').attr('src', 'assets/icons/checked-icon-green.svg')
            $('div#view-select-rp span').text('Selected')



            $('#recaptured-picture').prop("checked", true)

        }
    })


     //Click select button in the pfp modal
    $(document).on('click', '#selection-pfp', function(){
        resetRP();
        resetPBF();

        if($('#modal-button-pfp').hasClass('selected')){
            resetPFP();

            $('#picture-from-pco').prop("checked", false)
            

        } else{
            $('div#modal-button-pfp').addClass('selected')
            $('#modal-button-pfp #button-text-pfp').text('deselect')
            $('#modal-button-pfp img').attr('src', 'assets/icons/cancel-icon-white.svg')
            $('#pfp-alert #selected-notice-pfp').removeClass('d-none')
            $('#image-header-pfp').addClass('header-selected')
            $('div#image-header-pfp > #header-text-pfp').addClass('header-selected-text')


            //To change the view & Select button to selected when picture is chosen
            $('div#view-select-pfp').addClass('view-select-selected')
            $('div#view-select-pfp img').attr('src', 'assets/icons/checked-icon-green.svg')
            $('div#view-select-pfp span').text('Selected')

            $('#picture-from-pco').prop("checked", true)



        }
    })

    var resetPBF = function(){
        $('div#modal-button-pbf').removeClass('selected')
        $('#modal-button-pbf #button-text-pbf').text('select')
        $('#modal-button-pbf img').attr('src', 'assets/icons/checked-icon.svg')
        $('#pbf-alert #selected-notice-pbf').addClass('d-none')

        $('#image-header-pbf').removeClass('header-selected')
        $('#header-text-pbf').removeClass('header-selected-text')

        //To change the view & Select button to selected when picture is chosen
        $('div#view-select-pbf').removeClass('view-select-selected')
        $('div#view-select-pbf img').attr('src', 'assets/icons/eye-icon.svg')
        $('div#view-select-pbf span').text('View & Select')
    }

    var resetRP = function(){
            $('div#modal-button-rp').removeClass('selected')
            $('#modal-button-rp #button-text-rp').text('select')
            $('#modal-button-rp img').attr('src', 'assets/icons/checked-icon.svg')
            $('#rp-alert #selected-notice-rp').addClass('d-none')

            $('#image-header-rp').removeClass('header-selected')
            $('#header-text-rp').removeClass('header-selected-text')

            //To change the view & Select button to selected when picture is chosen
            $('div#view-select-rp').removeClass('view-select-selected')
            $('div#view-select-rp img').attr('src', 'assets/icons/eye-icon.svg')
            $('div#view-select-rp span').text('View & Select')
    }

    var resetPFP= function(){
        $('div#modal-button-pfp').removeClass('selected')
        $('#modal-button-pfp #button-text-pfp').text('select')
        $('#modal-button-pfp img').attr('src', 'assets/icons/checked-icon.svg')
        $('#pfp-alert #selected-notice-pfp').addClass('d-none')

        //To change the view & Select button to selected when picture is chosen
        $('div#view-select-pfp').removeClass('view-select-selected')
        $('div#view-select-pfp img').attr('src', 'assets/icons/eye-icon.svg')
        $('div#view-select-pfp span').text('View & Select')
        $('#image-header-pfp').removeClass('header-selected')
        $('#header-text-pfp').removeClass('header-selected-text')

    }

    // Functions for clicking previous and next buttons in modal for uncaptured & approved
    $(document).on('click', 'div#pbf-next a', function(){
        $('a#rp-view').click();
    })

    $(document).on('click', 'div#rp-next a', function(){
        $('a#pfp-view').click();
    })

    $(document).on('click', 'div#rp-previous a', function(){
        $('a#pbf-view').click();
    })

    $(document).on('click', 'div#pfp-previous a', function(){
        $('a#rp-view').click();
    })


    // Functions for clicking previous and next buttons in modal for captured

    $(document).on('click', 'div#pbf-next a', function(){
        $('a#rp-view-c').click();
    })

    $(document).on('click', 'div#rp-next a', function(){
        $('a#pfp-view-c').click();
    })

    $(document).on('click', 'div#rp-previous a', function(){
        $('a#pbf-view-c').click();
    })

    $(document).on('click', 'div#pfp-previous a', function(){
        $('a#rp-view-c').click();
    })


    //Function to submit verification
    $(document).on('click', '#submit', function(){
        var imageSelected = $("input[name='image-selected']:checked").val();
        var selectedReason = $('#select-reason').val();
        var additionalComment = $('#additional-comment').val();
        var pco_image = $('#pfp-image').attr('src')

        var data = {
            'unique_member_id': unique_member_id,
            'ik_number': ik_number,
            'approved_picture': imageSelected,
            'reason': selectedReason,
            'additional_comments': additionalComment,
            'pcs_id': username,
            'pfp_image': pco_image

        }

        // console.log(data)
        if(imageSelected===undefined){
            swal({
                title: 'No image selected, Please select an image...',

                type: 'warning',
                showCancelButton: false,
                confirmButtonText: 'Okay'
            });
            return;
        }

        if(selectedReason===null){
            swal({
                title: 'No reason selected, Please select a reason.',

                type: 'warning',
                showCancelButton: false,
                confirmButtonText: 'Okay'
            });
            return;
        }
    //    console.log(selectedReason)
        if(selectedReason==='Others' && additionalComment===''){
            swal({
                title: 'Additional Comments is Required when Reason selected is Others',

                type: 'warning',
                showCancelButton: false,
                confirmButtonText: 'Okay'
            });
            return;
        }

        swal({
            title: 'Are you sure you want to submit this approval?',
            type: 'info',
            showCancelButton: true,
            cancelButtonText: 'NO',
            confirmButtonText: 'YES',
            cancelButtonClass: 'no-button',
            confirmButtonClass: 'yes-button',
            buttonsStyling: false,
            reverseButtons: true,
        }).then(function(result){
            if(result.value){
                $('.index-wrapper').waitMe({
                        effect: 'bounce',
                        text: 'Loading...',
                        bg: 'rgba(255,255,255,0.7)',
                        color: '#000000',
                        maxSize: '',
                        textPos: 'vertical',
                        fontSize: '',
                        source: '',
                        onClose: function() {}
                });
                $.ajax({
                    url: "member_picture_verification_slim/public/api/v1/approveImage",
                    type: "POST",
                    data: {
                        'use': hub,
                        'data': data
                    },

                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                            console.log("Status: " + textStatus);
                            console.log("Error: " + errorThrown);
                    },
                    success: function(response){
                        // console.log(response);
                        // var count = JSON.parse(response);
                        // console.log(response)
                        if(response==='Image approved successfully'){
                            $('.index-wrapper').waitMe('hide');
                            swal({
                                title: 'Submission made & Picture updated Successfully',
                                type: 'success',
                                confirmButtonText: 'BACK TO DASHBOARD',
                                confirmButtonClass: 'back-home-button',
                                buttonsStyling: false,
                                reverseButtons: true,
                            }).then(function(result){
                                if(result.value){
                                    window.location = 'index.php';
                                }
                            })
 
                        } else{
                            swal({
                                    title: 'An error occured during submission.',
                                    type: 'info',
                                    showCancelButton: false,
                                    confirmButtonText: 'Okay',
                                    confirmButtonClass: 'yes-button',
                                    buttonsStyling: false,
                                }).then(function(result){
                                    if(result.value){
                                        location.reload();
                                    }
                                })
                        }
                      


                    }
                })
            }
        })
    })


$(document).on('keyup', '#datepicker_from, #datepicker_to', function(){
    // console.log('date picker changed...')
    indexFirstTable.draw();
})


// Reset datepicker input field
$(document).on('click', '#reset-date-picker', function(){
    // console.log('reset clicked....')
    $('#datepicker_to').val('').keyup()
    $('#datepicker_from').val('').keyup()
})

})(jQuery);