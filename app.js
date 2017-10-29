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
	var newRole = $("#roleinput").val().trim();
	var newDate = $("#dateinput").val().trim();
	var newRate = $("#rateinput").val().trim();

	console.log(newName);
	console.log(newRole);
	console.log(newDate);
	console.log(newRate);

	database.ref().push({
		name: newName,
		role: newRole,
		date: newDate,
		rate: newRate
	});
});

database.ref().on("child_added", function(snapshot) {

      // Print the initial data to the console.
      console.log(snapshot.val());

      //Get current date
      var then = moment((snapshot.val().date), 'DD/MM/YY');
      var diff = moment().diff(then, 'month');
      var amount = (diff*snapshot.val().rate);


      // Change the HTML
      var newRow = $("<tr>");

      newRow.append("<td>" + snapshot.val().name + "</td>");
      newRow.append("<td>" + snapshot.val().role + "</td>");
      newRow.append("<td>" + snapshot.val().date + "</td>");
      newRow.append("<td>" + diff + "</td>");
      newRow.append("<td>$" + snapshot.val().rate + "</td>");
      newRow.append("<td>$" + amount + "</td>");

      $("#employee-table").append(newRow);



    // Create Error Handling
}, function(errorObject) {
	console.log("The read failed: " + errorObject.code);
});
