// Firebase
var now;
var table;
var i=0;
var newTimeMins;
var nowMins;
// var nextArrival;
var minutesAway;
var freq;
var time;
var firstTime;
var dest;
var name;
var currentTime;
var currentTimemins,
currentTimeHrs,
currentMins,
newTime;
var minutesAwayArr = [];
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

    // Function is executed when submit button is clicked
    $("#submit").on("click",function (event){
        event.preventDefault();
        now = new moment().format("HH:mm");
        $("#sysTime").text(now);
        // setInterval(getSystemTime, 3000);
        console.log("submit button clicked");
        name = $("#input-name").val();
        dest = $("#input-dest").val();
        time = $("#input-time").val();
        freq = $("#input-freq").val();
    
        database.ref().push({
            name : name,
            destination : dest,
            time : time,
            frequency : freq
    
        });
    
    
    });
    
    // Function is called when changes are made to database
    database.ref().on("child_added",function(snapshot){
        name = snapshot.val().name;
        dest = snapshot.val().destination;
        frequency = snapshot.val().frequency;
        firstTime = snapshot.val().time;

        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        var currentTime = moment();

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        var rem = diffTime % frequency;
        console.log(rem);

        minutesAway = frequency - rem;
        var nextArrival = moment().add(minutesAway, "minutes");

        table = $("<tr>");
        table.attr("id","tableId");
        table.attr("data-row",i);
        table.append("<button class='btn bg-dark'id='trashBtn'data-toggle='tooltip'data-placement='side'title='Deletes from chosen list'><i class='fa fa-trash'></i></button>");
        table.append("<td>"+ snapshot.val().name + "</td>");
        table.append("<td>"+ snapshot.val().destination + "</td>");
        table.append("<td>"+ snapshot.val().frequency + "</td>");
        console.log("before printing " + nextArrival);
        table.append("<td>"+ moment(nextArrival).format("hh:mm A") + "</td>");
        table.append("<td id='minsAwayDom'>"+ minutesAway + "</td>");
        $("#table").append(table);
    });

    // On click on trash button removes train details from website
    
    $(document).on("click","#trashBtn",function(e){
        console.log("Inside trash function");
        e.preventDefault();
        $("#tableId").remove();


    });    

});



