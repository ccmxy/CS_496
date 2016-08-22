 serverAddress = 'http://52.38.127.124:3011/';

//Initial request to retrieve data:
var req = new XMLHttpRequest();
req.open('GET', serverAddress + 'get-data', true);
req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
        var workoutList = JSON.parse(req.responseText);
        console.log(workoutList[0].name);
        //Assemble table
        console.log(workoutList.length);
        makeTable(workoutList);

    } else {
        console.log("Error in network request: " + req.statusText);
    }
});

req.send(null);

//New Person
document.getElementById('add').addEventListener('click', function(event) {
	var hasName = true;
        var userConfirm = true;
	var isDuplicate = false;
        var gender;
 	var name =(""+ document.getElementById('name'));
     //Get gender to starr


    var radios = document.getElementsByName('gender');

    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
     	gender = radios[i].value; 
        // only one radio can be logically checked, don't check the rest
        break;
      }
   }
    //If user did not include a name:
    if(document.getElementById('name').value == '' && !isDuplicate){
	alert("You must include a name.");
		hasName = false;
	}	 

    if(!document.getElementById('reps').value && hasName &&!isDuplicate){
    if (confirm("You did not include an AGE. Save anyway?") == true) {
         userConfirm = true;
    } else {
        userConfirm = false;
    }
   }

    if(!document.getElementById('date').value && hasName && userConfirm == true && !isDuplicate){
    if (confirm("You did not include a DATE OF DEATH.  Save anyway?") == true) {
         userConfirm = true;
    } else {
        userConfirm = false;
    }
   }
 
  if(userConfirm == true && hasName == true && !isDuplicate){
    var req = new XMLHttpRequest();
    var payload = {};
    payload.name = document.getElementById('name').value;
    payload.reps = document.getElementById('reps').value;

     payload.gender = gender;

/* For doing many checkboxes of the same name
payload.checkboxes = ($("input[name='checkbox']:checked").map(function() {
    return this.value;
}).get().join(","));
*/


if ($('#checkbox1').is(":checked")){

	payload.checkbox1 = true;
}
else{
	payload.checkbox1 = false;
}


if ($('#checkbox2').is(":checked")){

        payload.checkbox2 = true;
}
else{
        payload.checkbox2 = false;
}


    payload.date = document.getElementById('date').value;
    req.open('POST', serverAddress + 'add', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);
            var workoutList = JSON.parse(req.responseText);
            makeTable(workoutList);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    //send the data
    req.send(JSON.stringify(payload));
    event.preventDefault();
    //Reset the input fields
    document.getElementById("newDeathForm").reset();
 }
});


//function to create table from list
function makeTable(workoutList) {
    
	//Using tbody as table 
    var tbody = document.getElementById("thisBody");
    //Remove all child elements of tbody to clear table
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    for (var idx = 0; idx < workoutList.length; idx++) {
        var tr = document.createElement("tr");

        //Add id 
        var tdId = document.createElement("td");
        tdId.textContent = ("" + workoutList[idx].id);
        tr.appendChild(tdId);
        //Add name
        var tdName = document.createElement("td");
	tdName.setAttribute("id", ""+ workoutList[idx].name);
        tdName.textContent = ("" + workoutList[idx].name);
        tr.appendChild(tdName);
        //Add rep
        var tdReps = document.createElement("td");
        tdReps.textContent = ("" + workoutList[idx].reps);
        tr.appendChild(tdReps);
        //Add gender
        var tdGender = document.createElement("td");
        tdGender.textContent = ("" + workoutList[idx].gender);
        tr.appendChild(tdGender);
        //Add date
        var tdDate = document.createElement("td");
        tdDate.textContent = ("" + workoutList[idx].date);
        tr.appendChild(tdDate);
        //Add checkbox1
        var tdCheckbox1 = document.createElement("td");
	if(workoutList[idx].checkbox1 === 1){
        	var icon = document.createElement("span");

        	icon.className ="glyphicon glyphicon-ok";
		tdCheckbox1.appendChild(icon);
	}
	
		
        //tdCheckbox1.textContent = (workoutList[idx].checkbox1);
        tr.appendChild(tdCheckbox1);
        tbody.appendChild(tr);

	



	//Add view form
        var tdView = document.createElement("td");
	tr.appendChild(tdView);
        var viewForm = createViewForm(idx, workoutList);
	viewForm.className += "btn btn-secondary btn-sm";
        tdView.appendChild(viewForm);

        //Add delete form
        var tdDelete = document.createElement("td");
        tr.appendChild(tdDelete);
        var deleteForm = createDeleteForm(idx, workoutList);
        tdDelete.appendChild(deleteForm);
        //Add edit form
        var tdEdit = document.createElement("td");
        tr.appendChild(tdEdit);
        var editForm = createEditForm(idx, workoutList);
        tdEdit.appendChild(editForm);


    }
}

//Function to create individual view button
function createViewForm(idx, workoutList) {
    var form = document.createElement("form");
    form.action = "/obituary";
    form.method = "post";
	//hidden id input
    var idHidden = document.createElement("input");
    idHidden.type = "hidden";
    idHidden.value = workoutList[idx].id;
    idHidden.name = "id";
    form.appendChild(idHidden);
	//hidden name input
    var nameHidden = document.createElement("input");
    nameHidden.type = "hidden";
    nameHidden.value = workoutList[idx].name;
    nameHidden.name = "name";
    form.appendChild(nameHidden);
	//hidden reps (age) input
    var repsHidden = document.createElement("input");
    repsHidden.type = "hidden";
    repsHidden.value = workoutList[idx].reps;
    repsHidden.name = "reps";
    form.appendChild(repsHidden);
	//hidden checkbox1  input
    var checkbox1Hidden = document.createElement("input");
    checkbox1Hidden.type = "hidden";
    checkbox1Hidden.value = workoutList[idx].checkbox1;
    checkbox1Hidden.name = "checkbox1";
    form.appendChild(checkbox1Hidden);
	//hidden date input
    var dateHidden = document.createElement("input");
    dateHidden.type = "hidden";
    dateHidden.value = workoutList[idx].date;
    dateHidden.name = "date";
    form.appendChild(dateHidden);
	//hidden gender input
    var genderHidden = document.createElement("input");
    genderHidden.type = "hidden";
    if(workoutList[idx].gender === "female"){
	genderHidden.value = "she";
	}
    else{
	genderHidden.value = "he";
	}
    genderHidden.name = "gender";
    form.appendChild(genderHidden);
	//submit button
    var inputSubmit = document.createElement("input");
    inputSubmit.type = "submit";
    inputSubmit.class = "view";
    inputSubmit.name = "View";
    inputSubmit.value = "View";
    form.appendChild(inputSubmit);
    return form;
}



//Function to create individual edit button for 
//the table
//Creates a form that posts to server route /edit-workout
//and sends in the id, name, reps, weight, date, & lbs
function createEditForm(idx, workoutList) {
    var form = document.createElement("form");
    form.action = "/edit-person";
    form.method = "post";
	//hidden id input
    var idHidden = document.createElement("input");
    idHidden.type = "hidden";
    idHidden.value = workoutList[idx].id;
    idHidden.name = "id";
    form.appendChild(idHidden);
	//hidden name input
    var nameHidden = document.createElement("input");
    nameHidden.type = "hidden";
    nameHidden.value = ("" + workoutList[idx].name);
    nameHidden.name = "name";
    form.appendChild(nameHidden);
	//hidden reps input
    var repsHidden = document.createElement("input");
    repsHidden.type = "hidden";
    repsHidden.value = workoutList[idx].reps;
    repsHidden.name = "reps";
    form.appendChild(repsHidden);
	//hidden checkbox1  input
    var checkbox1Hidden = document.createElement("input");
    checkbox1Hidden.type = "hidden";
    checkbox1Hidden.value = workoutList[idx].checkbox1;
    checkbox1Hidden.name = "checkbox1";
    form.appendChild(checkbox1Hidden);
	//hidden date input
    var dateHidden = document.createElement("input");
    dateHidden.type = "hidden";
    dateHidden.value = workoutList[idx].date;
    dateHidden.name = "date";
    form.appendChild(dateHidden);
	//hidden gender input
    var genderHidden = document.createElement("input");
    genderHidden.type = "hidden";
    genderHidden.value = workoutList[idx].gender;
    genderHidden.name = "gender";
    form.appendChild(genderHidden);
	//submit button
    var inputSubmit = document.createElement("input");
    inputSubmit.type = "submit";
    inputSubmit.class = "edit";
    inputSubmit.name = "Edit";
    inputSubmit.value = "Edit";
    form.appendChild(inputSubmit);
    return form;
}

//Function to create the delete button that
//goes next to each eleemnt in the table
//Posts id to server route /remove-machine
//and uses the response data to re-make the table
function createDeleteForm(idx, workoutList) {
    var form = document.createElement("form");
    var inputHidden = document.createElement("input");
    inputHidden.type = "hidden";
    inputHidden.value = workoutList[idx].id;
    inputHidden.name = "name";
    inputHidden.id = "hiddenInput";
    form.appendChild(inputHidden);
    var inputSubmit = document.createElement("input");
    inputSubmit.type = "submit";
    inputSubmit.class = "delete";
    inputSubmit.name = "Delete Workout";
    inputSubmit.value = "Delete";
    inputSubmit.id = workoutList[idx].id;
	//Add event listener to make Ajax request when delete is hit
    inputSubmit.addEventListener("click", function() {
        var req = new XMLHttpRequest();
        var payload = {};
        payload.id = inputHidden.value;
        req.open('POST', serverAddress + 'remove-machine', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                console.log(response);
                var workoutList = JSON.parse(req.responseText);
                makeTable(workoutList);
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        req.send(JSON.stringify(payload));
        event.preventDefault();
    });
    form.appendChild(inputSubmit);
    return form;
}
