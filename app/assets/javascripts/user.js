/**
 * Created by longtranvu on 1/11/17.
 */

$(function(){
    if($('#token')[0]!= undefined) {
        if($('#userRole')[0].innerText == 'admin')
        loadTable();
    }

    $("#signUpButton").off('click').click(function () {
        console.log('Ok');
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/v1/users",
            data:{
                user: {
                    name: $('input[name="name"]').val(),
                    email: $('input[name="email"]').val(),
                    role: $('select[name="role"]').val(),
                    password: $('input[name="password"]').val()
                }
            },
            success: function (json) {
                window.location.replace("http://localhost:3000/users/sign_in");
            }

        });
    });
});

function clearModal() {
    $('#addUserModel input[name="name"]').val("");
    $('#addUserModel input[name="password"]').val("");
    $('#addUserModel input[name="email"]').val("");
    $('#addUserModel #role').val("");

    $('#editUserModel input[name="name"]').val("");
    $('#editUserModel input[name="email"]').val("");
    $('#editUserModel #role').val("");

    $('#profile .showName').empty();
    $('#profile .showEmail').empty();
    $('#profile .showName').empty();
    $('#profile .Show_Name').empty();
    $('#profile .showCreateDate').empty();
    $('#profile .showModifyDate').empty();
    $('#profile .showID').empty();
    $('#profile .showRole').empty();
}

function addUserInModel() {
    $("#addUserButton").off('click').click(function(){

        $.ajax({
            type: "POST",
            headers: { 'Authorization': 'Token token="'+ $('#token')[0].innerText + '"' },
            url: "http://localhost:3000/api/v1/users",
            data: { user: { name: $('#addUserModel input[name="name"]').val(),
                password: $('#addUserModel input[name="password"]').val(),
                email:$('#addUserModel input[name="email"]').val(),
                role:$('#addUserModel #role').val()
            }
            },
            success: function(json) {
                loadTable();
                clearModal();
                $('#addUserModel').modal('toggle');

            }
        });

    });
}

function editUserInModel(user_id) {
    $("#editUserButton").off('click').click(function(){
        $.ajax({
            type: "PUT",
            headers: { 'Authorization': 'Token token="'+ $('#token')[0].innerText + '"' },
            url: "http://localhost:3000/api/v1/users/" + user_id ,
            data: { user: {
                name:  $('#editUserModel input[name="name"]').val(),
                email: $('#editUserModel input[name="email"]').val(),
                role:  $('#editUserModel #role').val()
                }
            },
            success: function(json) {
                loadTable();
                clearModal();
                $('#editUserModel').modal('toggle');
            }
        });

    });
}

function editUser() {
    $('.editUser').off('click').click(function (){
        var user_id = this.id;
        $.ajax({
            type: "GET",
            headers: { 'Authorization': 'Token token="'+ $('#token')[0].innerText + '"' },
            url: "http://localhost:3000/api/v1/users/"+ user_id,
            success: function(json) {
                $('#editUserModel input[name="name"]').val(json.name);
                $('#editUserModel input[name="email"]').val(json.email);
                $('#editUserModel #role').val(json.role);
                editUserInModel(user_id);
            }
        });
    });
}

function showUser() {
    $('.showUser , .showProfileUser').off('click').click(function (){
        var user_id = this.id;
        $.ajax({
            type: "GET",
            headers: { 'Authorization': 'Token token="'+ $('#token')[0].innerText + '"' },
            url: "http://localhost:3000/api/v1/users/"+ user_id,
            success: function(json) {
                clearModal();
                $('#profile .Show_Name').append(json.name);
                $('#profile .showName').append(json.name);
                $('#profile .showEmail').append(json.email);
                $('#profile .showRole').append(json.role);
                $('#profile .showID').append(json.id);
                $('#profile .showCreateDate').append(json.created_at);
                $('#profile .showModifyDate').append(json.updated_at);
            }
        });
    });
}

function deleteUser() {
    $('.delUser').off('click').click(function () {
        if (confirm("Are You Sure To Delete?")){

                $.ajax({
                    type:"DELETE",
                    headers: { 'Authorization': 'Token token="'+ $('#token')[0].innerText + '"' },
                    url: "http://localhost:3000/api/v1/users/" + this.id,
                    success: function(json) {
                        loadTable();
                    }
                });

        }
    });
}


function loadTable() {
    $.ajax({
        type: "GET",
        headers: {'Authorization': 'Token token="' + $('#token')[0].innerText + '"'},
        url: "http://localhost:3000/api/v1/users",
        success: function (data) {
            $('#table_content').empty();
            data.forEach(function (element) {
                var temp = '<tr>';
                temp += '<td class="text-center" id="' + element.id + '">' + element.id + '</td>';
                temp += '<td>' + element.name + '</td>';
                temp += '<td>' + element.email + '</td>';
                temp += '<td>' + element.role + '</td>';
                temp += "<td class='text-center'>" +
                    "<a class='btn btn-warning btn-xs showUser' data-toggle='modal' data-target='#profile' id='"+ element.id +"'><span class='glyphicon glyphicon-eye-open'></span> Show </a> " +
                    "<a class='btn btn-info btn-xs editUser' data-toggle='modal' data-target='#editUserModel' id='"+ element.id +"'><span class='glyphicon glyphicon-edit'></span> Edit</a> " +
                    "<a class='btn btn-danger btn-xs delUser' id='"+ element.id +"' ><span class='glyphicon glyphicon-remove'></span> Del</a></td>";
                temp += '</tr>';
                $('#table_content').append(temp);
            });
            addUserInModel();
            editUser();
            deleteUser();
            showUser()
        }
    });
}






