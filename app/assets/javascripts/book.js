/**
 * Created by longtranvu on 1/12/17.
 */
/**
 * Created by longtranvu on 1/11/17.
 */

$(function(){

    if($("#token")[0] != undefined){
        loadTableBook();
    }
});

function clearModalBook() {
    $('#addBookModel input[name="title"]').val("");
    $('#addBookModel textarea[name="description"]').val("");
    $('#editBookModel input[name="title"]').val("");
    $('#editBookModel textarea[name="description"]').val("");
    $('#profileBook .bookTitle').empty();
    $('#profileBook .bookDescription').empty();
    $('#profileBook .bookID').empty();
    $('#profileBook .Book_Title').empty();
    $('#profileBook .bookCreateDate').empty();
    $('#profileBook .bookModifyDate').empty();
    $('#profileBook .bookUserID').empty();
}

function addBookInModel() {
    $("#addBookModel #addBookButton").off('click').click(function(){
        $.ajax({
            type: "POST",
            headers: { 'Authorization': 'Token token="'+ $('#token')[0].innerText + '"' },
            url: "http://localhost:3000/api/v1/books",
            data: { book: { title: $('#addBookModel input[name="title"]').val(),
                description: $('#addBookModel textarea[name="description"]').val(),
                user_id: $('#userID')[0].innerText
            }
            },
            success: function(json) {
                loadTableBook();
                clearModalBook();
                $('#addBookModel').modal('hide');

            }
        });

    });
}

function editBookInModel(book_id) {
    $("#editBookModel #editBookButton").off('click').click(function(){
        $.ajax({
            type: "PUT",
            headers: { 'Authorization': 'Token token="'+ $('#token')[0].innerText + '"' },
            url: "http://localhost:3000/api/v1/books/" + book_id ,
            data: { book: {
                title:  $('#editBookModel input[name="title"]').val(),
                description: $('#editBookModel textarea[name="description"]').val(),
                    }
            },
            success: function(json) {
                loadTableBook();
                clearModalBook();
                $('#editBookModel').modal('hide');
            }
        });

    });
}

function editBook() {
    $('.editBook').click(function (){
        var book_id = this.id;
        $.ajax({
            type: "GET",
            headers: { 'Authorization': 'Token token="'+ $('#token')[0].innerText + '"' },
            url: "http://localhost:3000/api/v1/books/"+ book_id,
            success: function(json) {
                $('#editBookModel input[name="title"]').val(json.title);
                $('#editBookModel textarea[name="description"]').val(json.description);
                editBookInModel(book_id);
            }
        });
    });
}

function showBook() {
    $('.showBook').off('click').click(function (){
        var book_id = this.id;
        $.ajax({
            type: "GET",
            headers: { 'Authorization': 'Token token="'+ $('#token')[0].innerText + '"' },
            url: "http://localhost:3000/api/v1/books/"+ book_id,
            success: function(json) {
                console.log(json);
                clearModalBook();
                $('#profileBook .Book_Title').append(json.title);
                $('#profileBook .bookTitle').append(json.title);
                $('#profileBook .bookDescription').append(json.description);
                $('#profileBook .bookUserID').append(json.user_id);
                $('#profileBook .bookID').append(json.id);
                $('#profileBook .bookCreateDate').append(json.created_at);
                $('#profileBook .bookModifyDate').append(json.updated_at);
            }
        });
    });
}

function deleteBook() {
    $('.delBook').off('click').click(function () {
        if (confirm('Are You Sure To Delete?')){
            $.ajax({
                type:"DELETE",
                headers: { 'Authorization': 'Token token="'+ $('#token')[0].innerText + '"' },
                url: "http://localhost:3000/api/v1/books/" + this.id,
                success: function(json) {
                    loadTableBook();
                }
            });
        }

    });
}

function loadTableBook() {
    $.ajax({
        type: "GET",
        headers: {'Authorization': 'Token token="' + $('#token')[0].innerText + '"'},
        url: "http://localhost:3000/api/v1/books",
        success: function (data) {
            $('#table_content_book').empty();

            data.forEach(function (element) {
                var temp = '<tr>';
                    temp += '<td class="text-center" id="' + element.id + '">' + element.id + '</td>';
                    temp += '<td>' + element.title + '</td>';
                    temp += '<td>' + element.description + '</td>';
                    temp += '<td>' + element.user_id + '</td>';
                    temp += "<td class='text-center'>";
                    temp += "<a class='btn btn-warning btn-xs showBook' data-toggle='modal' data-target='#profileBook' id='"+ element.id +"'><span class='glyphicon glyphicon-eye-open'></span> Show </a> ";
                    if ($('#userID')[0].innerText == element.user_id || $('#userRole')[0].innerText == "admin") {
                        temp += "<a class='btn btn-info btn-xs editBook' data-toggle='modal' data-target='#editBookModel' id='" + element.id + "'><span class='glyphicon glyphicon-edit'></span> Edit</a> " +
                                "<a class='btn btn-danger btn-xs delBook' id='" + element.id + "' ><span class='glyphicon glyphicon-remove'></span> Del</a></td>";
                    }
                    temp += '</tr>';
                $('#table_content_book').append(temp);
            });

            addBookInModel();
            editBook();
            deleteBook();
            showBook()
        }
    });
}



