$(document).ready(function (){
  allTodos();
  $('#button-add').click(function (){
    var todoValue = $('#input-add').val();
    createTodo(todoValue);
  });
  $(document).on('click', '.delete-todo',function (){
    var buttonDelete = $(this);
    var idTodo = buttonDelete.parent().attr('data-id');
    deleteTodo(idTodo);
  });
});
// READ - CRUD
function allTodos () {
  $.ajax(
    {
      url: 'http://157.230.17.132:3004/todos',
      method: 'GET',
      success: function (data) {
        var todos = data;
        var source = $('#entry-template').html();
        var template = Handlebars.compile(source);

        for (var i = 0; i < todos.length; i++) {
          var todo = todos[i];
          var context = {
            text: todo.text,
            id: todo.id
           }
           var html = template(context);
           $('ol').append(html);
        }
      },
      error: function () {
        alert('errore');
      }
    });
}
// CREATE - CRUD
function createTodo (todoValue) {
  $.ajax(
    {
      url: 'http://157.230.17.132:3004/todos',
      method: 'POST',
      data: {
        text: todoValue
      },
      success: function (data) {
        console.log('invio effettuato');
        $('ol.todos').html('');
        allTodos();

      },
      error: function () {
        alert('errore');
      }
    });
}

function deleteTodo(id) {
  $.ajax (
    {
      url: 'http://157.230.17.132:3004/todos/' + id,
      method: 'DELETE',
      success: function (data) {
        $('ol.todos').html('');
        allTodos();
      },
      error: function () {
        alert('errore');
      }
    });
};
