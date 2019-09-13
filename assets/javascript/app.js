// Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCgilnIosgu4U2AIXTmDjVz0NgtUs1LEA8",
    authDomain: "first-project-59ca2.firebaseapp.com",
    databaseURL: "https://first-project-59ca2.firebaseio.com",
    projectId: "first-project-59ca2",
    storageBucket: "",
    messagingSenderId: "1062645255683",
    appId: "1:1062645255683:web:e42a220dbae93c569e0836"
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$(document).ready(function(){
    // Event listener for submit button
    // When submit button is clicked, user entered values are updated to DOM
    $("#submit").on("click",function(event){
    event.preventDefault();

    var name = $("#input-name").val();
    var dest = $("#input-dest").val();
    var time = $("#input-time").val();
    var freq = $("#input-freq").val();

    var table = $("<tr>");
    table.append("<td>"+ name + "</td>");
    table.append("<td>"+ dest + "</td>");
    table.append("<td>"+ time + "</td>");
    table.append("<td>"+ freq + "</td>");
    $("#table").append(table);
    // $("#display").append(name);
    // $("#display").append(dest);
    // $("#display").append(time);
    // $("#display").append(freq);

    console.log(name);
    console.log(dest);
    console.log(time);
    console.log(freq);
});
})  