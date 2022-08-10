var containerEl = $('.container');
var currentDayEl = $('#currentDay');
var currentDate = moment().format("dddd, MMMM Do");       ;
var currentHour = Number(moment().format('HH'));

var bussinessHours = {
  9: "9 AM",
  10: "10 AM",
  11: "11 AM",
  12: "12 PM",
  13: "1 PM",
  14: "2 PM",
  15: "3 PM",
  16: "4 PM",
  17: "5 PM"
};

/**
 * Dynamically creating the Event Calender
 */

function updateCurrentDayInHeader(){
  currentDayEl.text(currentDate);
}

function updateDynamicEventCalender() {
  for (var key of Object.keys(bussinessHours)) {

    var rowItemEl = $('<div class="row rowVal"></div>');
    var colItemEl1 = $('<section class="col-1 col1">' + bussinessHours[key] + '</section>');
    rowItemEl.append(colItemEl1);
    var saveBtn = $('<button class="saveBtn"/> </button>');

    var bussinessHour = Number(key);

    var eventDetails = getEventDetails(bussinessHours[key]);

    if (currentHour == bussinessHour) {
      var colItemEl2 = $('<section class="col-10 col2 present" contentEditable="true">' + eventDetails + '</section>');

    } else if (currentHour > bussinessHour) {
      var colItemEl2 = $('<section class="col-10 col2 past" contentEditable="true" >' + eventDetails + '</section>');

    } else if (currentHour < bussinessHour) {
      var colItemEl2 = $('<section class="col-10 col2 future" contentEditable="true">' + eventDetails + '</section>');

    }
    rowItemEl.append(colItemEl2);

    var colItemEl3 = $('<section class="col-1 col3"> </section>').attr('style', 'width: max-content');
    var save_img = $('<img src="./js/save_button.jpg"></img>');

    saveBtn.append(save_img);
    colItemEl3.append(saveBtn);
    rowItemEl.append(colItemEl3);
    containerEl.append(rowItemEl);
  }
}
/**
 * 
 * @param {*} event 
 * 
 * When save button is clicked, update the event to local storage
 */
function handleSaveEvent(event) {

  //console.log("Entered");
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(event.target);
  // get the parent `col3` element from the button we pressed and fetch its sibling `col2` and get the text
  var newAddedEvent = btnClicked.parent('.col3').siblings('.col2').text();
  // get the parent `col3` element from the button we pressed and fetch its sibling `col1` and get the text
  var businessHour = btnClicked.parent('.col3').siblings('.col1').text();

  updateEvent(businessHour, newAddedEvent)
}

/**
 * 
 * @param {*} event 
 * Updates the new Save button back on mouseout event
 */
function updateSaveButtonIcon(event) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(event.target);
  console.log("updateSaveButtonIcon");
  // Remove old save icon
  btnClicked.empty();
  var saved_img = $('<img src="./js/saved_button.jpg"></img>');

  btnClicked.append(saved_img);
}

/**
 * 
 * @param {*} event 
 * Updates the old Save button back on mouseout event
 */
function updateOldSaveButtonIcon(event) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(event.target);
  console.log("updateSaveButtonIcon");
  // Remove old save icon
  btnClicked.empty();
  var saved_img = $('<img src="./js/save_button.jpg"></img>');

  btnClicked.append(saved_img);
}

updateCurrentDayInHeader();
updateDynamicEventCalender();

// use event delegation on the `containerEl` to listen for click on any element with a class of `saveBtn`
containerEl.on('click', '.saveBtn', handleSaveEvent);

// use event delegation on the `containerEl` to listen for mouseenter on any element with a class of `saveBtn`
containerEl.on('mouseenter', '.saveBtn', updateSaveButtonIcon);

// use event delegation on the `containerEl` to listen for mouseenter on any element with a class of `saveBtn`
containerEl.on('mouseout', '.saveBtn', updateOldSaveButtonIcon);

/**
 * 
 * @param {*} businessHour 
 * @param {*} newAddedEvent 
 * updates the local storage with the newAddedEvent for the specific business hour
 */
function updateEvent(businessHour, newAddedEvent) {
  localStorage.setItem(businessHour, newAddedEvent);
}

/**
 * 
 * @param {*} businessHour 
 * @returns the event details for the passed in business hour from local storage if present else empty string 
 */
function getEventDetails(businessHour) {

  if (localStorage.getItem(businessHour) === null) {
    return "";
  } else {
    return localStorage.getItem(businessHour);
  }
}
