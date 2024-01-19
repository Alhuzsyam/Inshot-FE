
$(document).ready(function() {
    getallEmployee();
    addEmployee();
    editEmployee();
    
   
});



function deleteEmployee(employeeId) {
    console.log(employeeId);
    $.ajax({
        url: `http://localhost:8080/api/employee/delete/${employeeId}`,
        type: 'DELETE',
        success: function(response) {
          console.log(response);
          $('#Employee').empty();
          getallEmployee();
        },
        error: function(error) {
          console.error('Error deleting employee:', error);
        }
      });
  }

function getallEmployee(){
    var apiUrl = 'http://localhost:8080/api/employee/getall';
    $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
         //    console.log(data);
            $('#Employee').empty();
            $("#edit").hide();
            // Loop melalui data karyawan dan tambahkan baris baru untuk setiap karyawan
            for (var i = 0; i < data.length; i++) {
             var paddedId = String(data[i].id).padStart(3, '0');
              $('#Employee').append(`
                <tr>
                  <td scope="row">${paddedId}</td>
                  <td data-name="${data[i].name}">${data[i].name}</td>
                  <td data-phone="${data[i].phone}">${data[i].phone}</td>
                  <td data-position="${data[i].position}">${data[i].position}</td>
                  <td data-email="${data[i].email}">${data[i].email}</td>
                  <td><span class="badge badge-danger action ml-2"  id="delete_${data[i].id}">Delete</span> <span class="badge badge-warning action update_${data[i].id}"  id="update_${data[i].id}">Update</span><td>
                </tr>
              `);
                
              $(`#delete_${data[i].id}`).click(function() {
                 var clickedId = this.id.split('_')[1];
                 deleteEmployee(clickedId);
               });
               $(`.update_${data[i].id}`).click(function() {
                var clickedId = this.id.split('_')[1];
                updateEmployee(clickedId);
              });
            }
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
 }

 function addEmployee(){
    $('#add').click(function() {
        // Mendapatkan nilai dari formulir
        var name = $('#name').val();
        var position = $('#position').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
    
        var data = {
            name: name,
            position: position,
            email: email,
            phone:phone
          }; 
          if ($.trim(email) === ''|| $.trim(position) === ''||$.trim(name) === ''||$.trim(phone) === '') {
            alert("input field cant't empty");
          }else{
            $.ajax({
                url: 'http://localhost:8080/api/employee/insert', // Ganti dengan URL yang sesuai
                type: 'POST',
                contentType: 'application/json', // Mengatur tipe konten ke JSON
                data: JSON.stringify(data), // Mengonversi objek data menjadi JSON
                success: function(response) {
                  console.log(response);
                  $('#Employee').empty();
                  getallEmployee();
                  // Setelah berhasil mengirim, tambahkan logika yang sesuai
                },
                error: function(error) {
                  console.error('Error creating employee:', error);
                  // Handle error accordingly
                }
              });
          }
          
     });
 }

 function updateEmployee(id){
    $("#id").val(id);
    var row = $(`#update_${id}`).closest("tr");
    var name = row.find("td[data-name]").data("name");
    var email = row.find("td[data-email]").data("email");
    var position = row.find("td[data-position]").data("position");
    var phone = row.find("td[data-phone]").data("phone");
    
    $("#name").val(name);
    $("#email").val(email);
    $("#position").val(position);
    $("#phone").val(phone);
    $("#add").hide();
    $("#edit").show();



 }

 function editEmployee(){
    $('#edit').click(function() {
        var id =  $("#id").val(); 
        var name = $('#name').val();
        var position = $('#position').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
    
        var data = {
            id:id,
            name: name,
            position: position,
            email: email,
            phone:phone
          }; 
        console.log(data);
        // $.ajax({
        //     url: 'http://localhost:8080/api/employee/update', 
        //     type: 'PUT',      
        //     data: JSON.stringify(data),   
        //     success: function(response){
        //         // Update the result div with the response from the server
        //         $("#result").html(response);
        //     },
        //     error: function(xhr, status, error){
        //         console.error("Error updating data: " + error);
        //     }
        // });
        $.ajax({
            url: 'http://localhost:8080/api/employee/update', // Ganti dengan URL yang sesuai
            type: 'PUT',
            contentType: 'application/json', // Mengatur tipe konten ke JSON
            data: JSON.stringify(data), // Mengonversi objek data menjadi JSON
            success: function(response) {
              console.log(response);
              $('#Employee').empty();
              $('#add').show();
              $("#id").val(''); 
              $('#name').val('');
              $('#position').val('');
              $('#email').val('');
              $('#phone').val('');
              getallEmployee('');
              // Setelah berhasil mengirim, tambahkan logika yang sesuai
            },
            error: function(error) {
              console.error('Error creating employee:', error);
              // Handle error accordingly
            }
          });

        
    })
 }
