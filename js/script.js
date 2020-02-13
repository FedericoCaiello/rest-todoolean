$(document).ready(function (){
  allTodos();
});

function allTodos () {
  $.ajax(
    {
      url: 'http://157.230.17.132:3004/todos',
      method: 'GET',
      success: function (data) {
        var todos = data;
        console.log(todos);
        var source = $('#entry-template').html();
        var template = Handlebars.compile(source);

        for (var i = 0; i < todos.length; i++) {
          var todo = todos[i];
          var context = {
            text: todo.text,
           }
           var html = template(context);
           $('ul').append(html);
        }
      },
      error: function () {
        alert('errore');
      }
    });
}
