$('.task-input').keypress(function (e) {
    if ((e.which == 13) && ($(this).val().length > 0)) {
        debugger
        var TaskInput = $(this);
        $.post('/Todo/AddTodo/', { title: TaskInput.val() }).done(function (data) {
            var newTask = $(`<li class="task-list-item mb-3" data-id=" ${data} " data-createDate="  " data-updateDate="  " data-expiredDate="  " data-description="  "><div class="checkbox-wrapper-39"><label><input type="checkbox" /><span class="checkbox"></span></label></div><label class="task-list-item-label"><span class="todo" contenteditable="false">${TaskInput.val()}</span></label><div class="btn-container"><span class="info-btn" title="İnfo Task"></span><span class="delete-btn" title="Delete Task"></span></div>`);
            $('.task-list').prepend(newTask);
            TaskInput.val('');
        });
    }
    else if (e.which == 13) {
        alert('Please enter new task');
    }

});


$('.task-list').on('click', '.checkbox', function () {
    debugger

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