var config = {
	apiKey: "AIzaSyCGR2Sn5o-XtsTUIgR517stDaW_mvkB7Jk",
	authDomain: "kikiritsu-cd9c5.firebaseapp.com",
	databaseURL: "https://kikiritsu-cd9c5.firebaseio.com",
	projectId: "kikiritsu-cd9c5",
	storageBucket: "kikiritsu-cd9c5.appspot.com",
	messagingSenderId: "1011960466594"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submitbutton").on("click", function(event) {


	var newName = $("#nameinput").val().trim();
	var newDest = $("#destinput").val().trim();
	var newFreq = $("#freqinput").val().trim();
	var newTime = $("#timeinput").val().trim();

	console.log(newName);
	console.log(newDest);
	console.log(newFreq);
	console.log(newTime);

	database.ref().push({
		name: newName,
		destination: newDest,
		frequency: newFreq,
		time: newTime
	});
});

database.ref().on("child_added", function(snapshot) {

      // Print the initial data to the console.
      var tFrequency = snapshot.val().frequency;
      var firstTime = snapshot.val().time;
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      var currentTime = moment();
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      var tRemainder = diffTime % tFrequency;
      var tMinutesTillTrain = tFrequency - tRemainder;
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var nextTrainConverted = moment(nextTrain).format("HH:mm");


      var newRow = $("<tr>");

      newRow.append("<td>" + snapshot.val().name + "</td>");
      newRow.append("<td>" + snapshot.val().destination + "</td>");
      newRow.append("<td>" + snapshot.val().frequency + "</td>");
      newRow.append("<td>" + nextTrainConverted + "</td>");
      newRow.append("<td>" + tMinutesTillTrain + " minutes away.</td>");

      $("#train-table").append(newRow);



    // Create Error Handling
}, function(errorObject) {
	console.log("The read failed: " + errorObject.code);
});
