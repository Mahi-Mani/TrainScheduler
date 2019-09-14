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
    database.ref().on("child_added",function(snapshot){
        console.log("Snapshot : "+snapshot.val().name);
        var table = $("<tr>");
        table.append("<td>"+ snapshot.val().name + "</td>");
        table.append("<td>"+ snapshot.val().destination + "</td>");
        // table.append("<td>"+ snapshot.val().time + "</td>");
        table.append("<td>"+ snapshot.val().frequency + "</td>");
        table.append("<td>"+ snapshot.val().nextArrival + "</td>");
        table.append("<td>"+ snapshot.val().minutesAway + "</td>");
        $("#table").append(table);


    });

    // Event listener for submit button
    // When submit button is clicked, user entered values are updated to DOM
    $("#submit").on("click",function(event){
    event.preventDefault();

    var name = $("#input-name").val();
    var dest = $("#input-dest").val();
    var time = $("#input-time").val();
    var freq = $("#input-freq").val();
    var currentTime = new moment().format("HH:mm");
    var newcurrentTime = moment(currentTime,"HH:mm");
    console.log(newcurrentTime);
    // var mins = (currentTime.hour()*60) + currentTime.minute();
    // var mins = moment(currentTime.toMinutes());
    // var mins = currentTime.toObject().minutes;
    var currentTimemins = new moment().format("mm");
    var currentTimeHrs = new moment().format("HH");
    console.log(currentTimemins);
    console.log(currentTimeHrs);
    var currentMins = parseInt(currentTimemins) + parseInt((currentTimeHrs * 60));
    console.log(currentMins);
    console.log(time);
    var newTime = moment(time, "HH:mm");

    var start = moment.duration(currentTime, "HH:mm");
    var end = moment.duration(time, "HH:mm");
    var diff = start.subtract(end);
    var hours = diff.hours(); // return hours
    var minutes = diff.minutes(); // return minutes
    console.log("**********************");
    console.log(minutes);
    console.log(hours);
    var diffInMins = minutes + (hours * 60);
    console.log(diffInMins);
    var x = diffInMins % freq;
    console.log("xxxxxxxxxxxxxxx");
    console.log(x);
    if(x === 0){
        var nextTrainMins = currentMins + freq;
        var nextTrain = moment(nextTrainMins,"HH:mm");
    }
    if(x>0){
        nextTrainMins = freq - x;
        nextTrainMins = parseInt(nextTrainMins) + parseInt(currentMins);
        var nextTrain = moment(nextTrainMins,"HH:mm");
    }
    console.log("1111111111111111111");
    var nextArrival = moment.utc().startOf('day').add(nextTrainMins, 'minutes').format('hh:mm A');
    var minutesAway = nextTrainMins - currentMins;
    console.log(nextArrival);
    console.log(minutesAway);

    
    database.ref().push({
        name : name,
        destination : dest,
        time : time,
        frequency : freq,
        currentTime : currentTime,
        nextArrival : nextArrival,
        minutesAway : minutesAway

    });

    console.log(name);
    console.log(dest);
    console.log(time);
    console.log(freq);
});
})  