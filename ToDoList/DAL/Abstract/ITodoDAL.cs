using ToDoList.Models;
using ToDoList.Models.TodoVİewModels;

namespace ToDoList.DAL.Abstract
{
    public interface ITodoDAL
    {
        public bool DeleteTodo(Guid Id);
        public bool ToggleTodo(Guid Id);

        public string AddTodo(Todo todo);

        public bool UpdateTodo(Todo todo);

        public List<Todo>? GetUsersTodos(Guid UserId);

        public List<Todo> GetTodoById(Guid TodoId);

    }
}
