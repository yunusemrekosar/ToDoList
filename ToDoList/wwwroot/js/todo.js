$('.task-input').keypress(function (e) {
    if ((e.which == 13) && ($(this).val().length > 0)) {
        var TaskInput = $(this);
        $.post('/Todo/AddTodo/', { title: TaskInput.val() }).done(function (data) {
            var newTask = $(`<li class="task-list-item mb-3" data-id="${data}" data-createDate="" data-updateDate="" data-expiredDate=" " data-description=" ">
                            <div class="checkbox-wrapper-39">
                                <label>                                  
                                <input type="checkbox" checked />
                                <span class="checkbox"></span>
                                </label>
                            </div>
                            <label class="task-list-item-label">
                                <span contenteditable="true">${TaskInput.val()}</span>
                            </label>
                            <div class="btn-container">
                                <span class="info-btn" title="İnfo Task"></span>

                                <span class="delete-btn" title="Delete Task"></span>
                            </div>
                        </li>`);
            $('.task-list').prepend(newTask);
            TaskInput.val('');
        });
    }
    else if (e.which == 13) {
        alert('Please enter new task');
    }

});
