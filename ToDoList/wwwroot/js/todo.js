$('.task-input').keypress(function (e) {
    if ((e.which == 13) && ($(this).val().length > 0)) {
        var TaskInput = $(this);
        $.post('/Todo/AddTodo/', { title: TaskInput.val() }).done(function (data) {

            var createdOn = moment(data.createdOn, "YYYY-MM-DDTHH:mm").format("D.MM.YYYY HH:mm:ss");

            var updatedOn = moment(data.updatedOn, "YYYY-MM-DDTHH:mm").format("D.MM.YYYY HH:mm:ss");

            var expiredOn = moment(data.expiredOn, "YYYY-MM-DDTHH:mm").format("D.MM.YYYY HH:mm:ss");


            var newTask = $(`<li class="task-list-item mb-3 list-todo" data-id=" ${data.id} " data-createDate=" ${createdOn} " data-updatedDate=" ${updatedOn} " data-expiredDate=" ${expiredOn != 'Invalid date' ? expiredOn : ''} " data-description=" ${data.description != null ? data.description : ''} "><div class="checkbox-wrapper-39"><label><input type="checkbox" /><span class="checkbox"></span></label></div><label class="task-list-item-label"><span class="todoname-label" contenteditable="false">${TaskInput.val()}</span></label><div class="btn-container"><span class="info-btn" title="İnfo Task"></span><span class="delete-btn" title="Delete Task"></span></div>`);
            $('.task-list').prepend(newTask);
            TaskInput.val('');
        });

    }
    else if (e.which == 13) {
        alert('Please enter new task');
    }
});

$('.submit-task').on('click', function (e) {
    debugger
    if ($('.task-input').val().length > 0) {
        var TaskInput = $('.task-input');
        $.post('/Todo/AddTodo/', { title: TaskInput.val() }).done(function (data) {
            var createdOn = moment(data.createdOn, "YYYY-MM-DDTHH:mm").format("D.MM.YYYY HH:mm:ss");

            var updatedOn = moment(data.updatedOn, "YYYY-MM-DDTHH:mm").format("D.MM.YYYY HH:mm:ss");

            var expiredOn = moment(data.expiredOn, "YYYY-MM-DDTHH:mm").format("D.MM.YYYY HH:mm:ss");



            var newTask = $(`<li class="task-list-item mb-3 list-todo" data-id=" ${data.id} " data-createDate=" ${createdOn} " data-updatedDate=" ${updatedOn} " data-expiredDate=" ${expiredOn != 'Invalid date' ? expiredOn : ''} " data-description=" ${data.description} "><div class="checkbox-wrapper-39"><label><input type="checkbox" /><span class="checkbox"></span></label></div><label class="task-list-item-label"><span class="todoname-label" contenteditable="false">${TaskInput.val()}</span></label><div class="btn-container"><span class="info-btn" title="İnfo Task"></span><span class="delete-btn" title="Delete Task"></span></div>`);
            $('.task-list').prepend(newTask);
            TaskInput.val('');
        });
    } else {
        alert('Please enter new task');
    }
});


$('.task-list').on('click', '.info-btn', function () {
    var a = $(this).closest(".list-todo");
    var theTodo = a.find(".todoname-label").text().trim();
    console.log(theTodo)
 
    $('.details').attr('data-id', a.data('id'));
    $('.details .todoname').text(theTodo);


    var updatedDatde = moment(a.attr('data-updatedDate'), "D.MM.YYYY HH:mm:ss", "tr").format("YYYY-MM-DDTHH:mm");
    console.log(updatedDatde)
    debugger
    $('.details #updated').val(updatedDatde);

    var expiredDatde = moment(a.attr('data-expiredDate').trim(), "D.MM.YYYY HH:mm:ss", "tr").format("YYYY-MM-DDTHH:mm");
    $('.details #expired').val(expiredDatde);

    var description = a.attr('data-description');
 
    if (description.trim() !== "")
        $('.add-desc').val(description);
    else
        $('.add-desc').val('');

    $('.details').removeClass('none').addClass('col-md-4');
    $('.main').removeClass('col-md-12').addClass('col-md-8');
});


$('.task-list').on('click', '.checkbox', function () {
    var todoLi = $(this).closest(".task-list-item");
    $.post('/Todo/ToggleTodo/', { Id: todoLi.data('id') }).done(function () {
        todoLi.find('.task-list-item-label').toggleClass('done');
    });
});

$('.task-list').on('click', '.delete-btn', function () {

    var todoLi = $(this).closest(".task-list-item");
    $.post('/Todo/DeleteTodo/', { Id: todoLi.data('id') }).done(function () {
        todoLi.remove();
    })
})


$('.todonameparent').on('dblclick', '.todoname', function () {
    $(this).attr('contenteditable', 'true').focus();
});

$('.todonameparent').on('blur', '.todoname', function () {
    $(this).attr('contenteditable', 'false');
});

$('.update-task').on('click', function () {
    debugger
    var updatedId = $(".details").attr('data-id');
    var title = $(".todoname").text();
    var expiredDate = $("#expired").val();
    var updatedDate = $("#updated").val();
    var desc = $(".add-desc").val();
    console.log(expiredDate);
    console.log(updatedDate);
    var updated = moment(updatedDate, "YYYY-MM-DDTHH:mm").format("D.MM.YYYY HH:mm:ss");
    var expired = moment(expiredDate, "YYYY-MM-DDTHH:mm").format("D.MM.YYYY HH:mm:ss");
    $.post('/Todo/UpdateTodo/', { Id: updatedId, Title: title, ExpiredOn: expiredDate, UpdatedOn: updatedDate, Description: desc }).done(function () {
        var updatedLi = $(`.list-todo[data-id="${updatedId}"]`);
        var createdDate = updatedLi.data('createDate');
        updatedLi.attr('class', 'task-list-item mb-3 list-todo');
        updatedLi.attr('data-id', updatedId);
        updatedLi.attr('data-createDate', createdDate);
        updatedLi.attr('data-updateDate', updated);
        updatedLi.attr('data-expiredDate', expired);
        updatedLi.attr('data-description', desc);
        updatedLi.find('.todoname-label').text(title);
    })

});

//$('.update-parent').on('click', '.update-task', function () {
//    var updateButton = $(this); // Tıklanan "Update Task" düğmesi

//    var id = updateButton.closest('.details').data('id');
//    var title = updateButton.closest('.update-parent').find('.todoname').text();
//    var expiredDate = updateButton.closest('.update-parent').find('#expired').val();
//    var updatedDate = updateButton.closest('.update-parent').find('#updated').val();
//    var desc = updateButton.closest('.update-parent').find('.add-desc').val();

//    $.post('/Todo/UpdateTodo/', { Id: id, Title: title, ExpiredOn: expiredDate, UpdatedOn: updatedDate, Description: desc }).done(function () {
//        var updatedLi = $(`.list-todo[data-id="${id}"]`);
//        var createdDate = updatedLi.data('createDate');

//        updatedLi.attr('class', 'task-list-item mb-3 list-todo');
//        updatedLi.attr('data-id', id);
//        updatedLi.attr('data-createDate', createdDate);
//        updatedLi.attr('data-updateDate', updatedDate);
//        updatedLi.attr('data-expiredDate', expiredDate);
//        updatedLi.attr('data-description', desc);
//        updatedLi.find('.todoname-label').text(title);

//        updateButton.closest('.details').data('id', id); // .details elementinin data-id'sini güncelle
//    });
// });


//.todoname {
//    -webkit - user - select: none; /* Safari/Chrome için */
//    -moz - user - select: none; /* Firefox için */
//    -ms - user - select: none; /* IE/Edge için */
//    user - select: none; /* Diğer tarayıcılar için */
//} todo aç kapa yapılabilir bi ara bak

