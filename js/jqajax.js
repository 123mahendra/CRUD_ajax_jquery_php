$(document).ready(function() {
    // Ajax Request for retrieving data
    function showdata() {
        output = "";
        $.ajax({
            url: "retrieve.php",
            method: "GET",
            dataType: "JSON", //if convert json string to jquery formate or javascript object
            success: function(data) {
                // console.log(data);
                if (data) {
                    x = data;
                } else {
                    x = "";
                }
                for (i = 0; i < x.length; i++) {
                    // console.log(x[i]);
                    output += "<tr><td>" + x[i].id + "</td><td>" + x[i].name + "</td><td>" + x[i].email + "</td><td> <button class=' btn-warning btn-sm btn-edit' data-sid=" + x[i].id + ">Edit</button> <button class=' btn-danger btn-sm btn-del' data-sid=" + x[i].id + ">Delete </button></td></tr>";
                }
                $("#tbody").html(output);
            },
        });
    }
    showdata();

    // Ajax Request for Insert Data
    $("#btnadd").click(function(e) {
        e.preventDefault();
        console.log("Save Button CLicked");
        let stid = $("#stuid").val();
        let nm = $("#nameid").val();
        let em = $("#emailid").val();
        let pw = $("#passwordid").val();
        // console.log(nm);
        // console.log(em);
        // console.log(pw);

        mydata = { id: stid, name: nm, email: em, password: pw }; //mydata=javascript object
        // console.log(mydata);
        $.ajax({
            url: "insert.php",
            method: "POST",
            data: JSON.stringify(mydata), // mydata is in JSON string as data
            success: function(data) { //data = any text
                // console.log(data);
                msg = "<div class='alert alert-dark mt-3 text-center'>" + data + "</div>";
                $("#msg").html(msg);
                $("form")[0].reset(); //make field empty after save
                showdata();
            }
        });

    });
    //AJAX request for delete data
    $("#tbody").on("click", ".btn-del", function() {
        console.log("Deleted Buttom CLicked");
        let id = $(this).attr("data-sid");
        // console.log(id);
        mydata = { sid: id };
        mythis = this;
        $.ajax({
            url: "delete.php",
            method: "POST",
            data: JSON.stringify(mydata),
            success: function(data) {
                // console.log(data);
                msg = "<div class='alert alert-dark mt-3 text-center'>" + data + "</div>";
                $("#msg").html(msg);
                // showdata();
                $(mythis).closest("tr").fadeOut();
            }
        })
    });


    //AJAX request for edit data
    $("#tbody").on("click", ".btn-edit", function() {
        console.log("Edit Buttom CLicked");
        let id = $(this).attr("data-sid");
        // console.log(id);
        mydata = { sid: id };
        mythis = this;
        $.ajax({
            url: "edit.php",
            method: "POST",
            dataType: "JSON",
            data: JSON.stringify(mydata),
            success: function(data) {
                // console.log(data);
                $("#stuid").val(data.id);
                $("#nameid").val(data.name);
                $("#emailid").val(data.email);
                $("#passwordid").val(data.password);
            },
        });
    });

});