// Firebase
var now;
var table;
var i=0;
var newTimeMins;
var nowMins;
var nextArrival;
var minutesAway;
var freq;
var time;
var dest;
var name;
var currentTime;
var currentTimemins,
currentTimeHrs,
currentMins,
newTime;
var rowCount;
var minutesAwayArr = [];
var nameArr = [];
var destArr = [];
var freqArr = [];
var timeArr = [];
var newTimeMinsArr = [];
var nowMinsArr = [];
var nextArrivalArr = [];

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
    // function getSystemTime(){
        $("#submit").on("click",function (event){
            event.preventDefault();
            now = new moment().format("HH:mm");
            $("#sysTime").text(now);
            // setInterval(getSystemTime, 3000);
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
         

    // Calls getSystemTime function every 1 secs
    setInterval(getSystemTime,1000);

    function getSystemTime(){
         now = new moment().format("HH:mm");
        $("#sysTime").text(now);
        change();
    
    }
    
    database.ref().on("child_added",function(snapshot){
        name = snapshot.val().name;
        dest = snapshot.val().destination;
        frequency = snapshot.val().frequency;
        firstTime = snapshot.val().time;

        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var rem = diffTime % frequency;

        minutesAway = frequency - rem;
        var nextArrival = moment().add(minutesAway, "minutes");
        var table = $("<tr>");
         table.attr("id","tableId");
        table.attr("data-row",i);
        // table.append("<button class='btn bg-dark'id='trashBtn'data-toggle='tooltip'data-placement='side'title='Deletes from chosen list'><i class='fa fa-trash'></i></button>");
        table.append("<td>"+ snapshot.val().name + "</td>");
        table.append("<td>"+ snapshot.val().destination + "</td>");
        table.append("<td>"+ snapshot.val().frequency + "</td>");
        table.append("<td>"+ moment(nextArrival).format("hh:mm A") + "</td>");
        table.append("<td id='minsAwayDom'>"+ minutesAway + "</td>");
        $("#table").append(table);
        pushToArray(snapshot.val().name, snapshot.val().destination, snapshot.val().frequency, moment(nextArrival).format("hh:mm A"), minutesAway, snapshot.val().time)
    });

    // On click on trash button removes train details from website
    
    // $(document).on("click","#trashBtn",function(e){
    //     e.preventDefault(); 
    //     $("#tableId").remove();

    // });

function pushToArray(name, dest, freq, nextArrival, minutesAway, time){

    nameArr.push(name);
    destArr.push(dest);
    freqArr.push(freq);
    minutesAwayArr.push(minutesAway);
    nextArrivalArr.push(nextArrival);
    timeArr.push(time);
    }


var systemTime = document.getElementById("sysTime");
function change(){

    for(i=0; i<nameArr.length; i++){
        console.log(nextArrivalArr[i]);
        newTimeMinsArr[i] = moment(nextArrivalArr[i], 'hh:mm A').diff(moment().startOf('day'), 'minutes');
        console.log(newTimeMinsArr[i]);
        nowMinsArr[i] = moment(now, 'HH:mm').diff(moment().startOf('day'), 'minutes');
        if(parseInt(newTimeMinsArr[i]) > parseInt(nowMinsArr[i])){
            minutesAwayArr[i] = newTimeMinsArr[i] - nowMinsArr[i];
            }

        if(parseInt(newTimeMinsArr[i]) === parseInt(nowMinsArr[i])){
            minutesAwayArr[i] = 0;  
            }

        if(parseInt(newTimeMinsArr[i]) < parseInt(nowMinsArr[i])){
            // console.log("next arrival in mins " + newTimeMinsArr[i]);
            // // nextArrivalArr[i] = moment().add(minutesAwayArr[i], "minutes");
            // // nextArrivalArr[i] = (parseInt(newTimeMinsArr[i]) + parseInt(freqArr[i]));
            // nextArrivalArr[i] = moment(parseInt(newTimeMinsArr[i])).add(freqArr[i], "minutes");
            // console.log("Next arrival in mins after calc " + nextArrivalArr[i]);
            // nextArrivalArr[i] = moment(parseInt(nextArrivalArr[i])).format("hh:mm A");
            
            // console.log("Next Arrival " + nextArrivalArr[i]);
            // minutesAwayArr[i] = freqArr[i]
            //console.log("Minutes Away " + minutesAwayArr[i])''

            console.log(nameArr[i]);
            console.log(timeArr[i]);
            var firstTimeConverted = moment(timeArr[i], "HH:mm").subtract(1, "years");
            currentTime = moment();
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log(freqArr[i]);
            var rem = diffTime % freqArr[i];
            minutesAwayArr[i] = freqArr[i] - rem;
            var newNextArrival = moment().add(minutesAwayArr[i], "minutes");
            nextArrivalArr[i] = moment(newNextArrival).format("hh:mm A");
            console.log(minutesAwayArr[i]);
            
            }
    }

    for(i=0; i<nameArr.length; i++){     
        
        $('#table tr[data-row="'+i+'"]').remove();

        var table = $("<tr>");
        table.attr("id","tableId");
        table.attr("data-row",i);
        table.append("<button class='btn bg-dark'id='trashBtn'data-toggle='tooltip'data-placement='side'title='Deletes from chosen list'><i class='fa fa-trash'></i></button>");
        table.append("<td>"+ nameArr[i] + "</td>");
        table.append("<td>"+ destArr[i] + "</td>");
        table.append("<td>"+ freqArr[i] + "</td>");
        table.append("<td>"+ nextArrivalArr[i] + "</td>");
        if(minutesAwayArr[i]==0)
            table.append("<td id='minsAwayDom'>"+ "Your train has arrived" + "</td>");
        else
            table.append("<td id='minsAwayDom'>"+ minutesAwayArr[i] + "</td>");
        $("#table").append(table);
       
        }

    }

});



