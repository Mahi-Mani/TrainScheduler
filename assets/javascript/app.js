// Firebase
var now;
var table;
var i=0;
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
    setInterval(getSystemTime,1000);

    function getSystemTime(){
        // var now = new Date();
        // console.log(now);
        // now = Date();
         now = new moment().format("HH:mm");
        // console.log("Is now here?");
        // console.log(now);
        $("#sysTime").text(now);
        // database.ref("/systemTime").set({
        //     now : now
    
        // });
    
    }
    
    database.ref().on("child_added",function(snapshot){
        // console.log("On value ca]haneg");
        console.log("Snapshot : "+snapshot.val().name);
         table = $("<tr>");
         table.attr("id","tableId");
        table.attr("data-row",i);
        // table.append(.glyphicon);
        table.append("<button class='btn bg-dark'id='trashBtn'data-toggle='tooltip'data-placement='side'title='Deletes from chosen list'><i class='fa fa-trash'></i></button>");
        table.append("<td>"+ snapshot.val().name + "</td>");
        table.append("<td>"+ snapshot.val().destination + "</td>");
        // table.append("<td>"+ snapshot.val().time + "</td>");
        table.append("<td>"+ snapshot.val().frequency + "</td>");
        table.append("<td>"+ snapshot.val().nextArrival + "</td>");
        table.append("<td id='minsAwayDom'>"+ snapshot.val().minutesAway + "</td>");
        $("#table").append(table);
        // i++;
    });

    // On click on trash button removes train details from website
    $(document).on("click","#trashBtn",function(e){
        console.log("Inside trash function");
        e.preventDefault();
        // $(this).attr("data-row").remove();
        $("#tableId").remove();
        // var ref = new Firebase("https://console.firebase.google.com/u/0/project/first-project-59ca2/database/first-project-59ca2/data");
        // database.ref().child(currentTime).remove();

    });

    // database.ref().on('child_removed', function (snapshot) {
    //     // removed!
    //     $("#tableId").remove();
    // })

    
    // Event listener for submit button
    // When submit button is clicked, user entered values are updated to DOM
    $("#submit").on("click",function(event){
    event.preventDefault();
    // setInterval(getSystemTime, 3000);
    console.log("submit button clicked");
    var name = $("#input-name").val();
    var dest = $("#input-dest").val();
    var time = $("#input-time").val();
    var freq = $("#input-freq").val();
    var currentTime = new moment().format("HH:mm");
    // var newcurrentTime = moment(currentTime,"HH:mm");
    // console.log(newcurrentTime);
    var currentTimemins = new moment().format("mm");
    var currentTimeHrs = new moment().format("HH");
    console.log(currentTimemins);
    console.log(currentTimeHrs);
    var currentMins = parseInt(currentTimemins) + parseInt((currentTimeHrs * 60));
    console.log(currentMins);
    console.log(time);
    var newTime = moment(time, "HH:mm");

    if(currentTime > time){
    var start = moment.duration(currentTime, "HH:mm");
    var end = moment.duration(time, "HH:mm");
    }
    else{
     end = moment.duration(currentTime, "HH:mm");
     start = moment.duration(time, "HH:mm");

    }
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
    console.log("================================");

    database.ref().push({
        name : name,
        destination : dest,
        time : time,
        frequency : freq,
        currentTime : currentTime,
        nextArrival : nextArrival,
        minutesAway : minutesAway,
        now : now

    });
});

});

