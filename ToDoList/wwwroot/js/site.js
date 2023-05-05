$('.btn-close-white').on('click', function () {
    $('.details').removeClass('col-md-4');
    $('.details').addClass('none');
    $('.main').removeClass('col-md-8');
    $('.main').addClass('col-md-12');
});

$('.task-list').on('click','.info-btn', function () {
    $('.details').removeClass('none');
    $('.details').addClass('col-md-4');
    $('.main').removeClass('col-md-12');
    $('.main').addClass('col-md-8');
});


//$('.openbtn').on('click',  function () {
//    $(".sidenav").toggleClass('side-toggled');
//    $(".main").toggleClass('main-toggled');
//});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
} // todo: jquerye dön
