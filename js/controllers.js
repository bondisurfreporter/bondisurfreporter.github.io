var bondiSurfReport = angular.module('bondiSurfReport', []);

bondiSurfReport.controller('bondiSurfReportCtrl', ['$scope', '$http',
  function ($scope, $http) {
    var url = "http://swellcast.com.au/api/v1/locations/sydney-surf-report.json?api_key=qRL8TDrA7CsbEktt8Lnu";

	$http.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
	$http.defaults.headers.common["Access-Control-Allow-Headers"] = "application/json"	
	
	//Use to compare and search
	var today = moment().format('dddd').toLowerCase().trim();
	//Use to display date
	var displayToday = moment().format('LL');
	//Use to compare and search	
	var tomorrow = moment().add(1, 'days').format('dddd').toLowerCase().trim();
	//Use to display date	
	var displayTomorrow = moment().add(1, 'days').format('LL');
	//Use to compare and search	
	var dayAfter = moment().add(2, 'days').format('dddd').toLowerCase().trim();
	//Use to display date	
	var displayDayAfter = moment().add(2, 'days').format('LL');
	//Use to compare and search	
	var lastDay = moment().add(3, 'days').format('dddd').toLowerCase().trim();	
	//Use to display date	
	var displayLastDay = moment().add(3, 'days').format('LL');
	
	
	$.ajax({
    		url: url,
    		async: false,
		    dataType: 'JSONP',
    		jsonpCallback: 'callback',
	    	type: 'GET',
	    	success: function (data) {			    	
		    	var html = "<div><table class='table table-bordered'>";
		    	//Construct table heading displaying dates
		    	html += "<tr><th>Time</th><th>"+displayToday+"</th><th>"+displayTomorrow+"</th><th>"+displayDayAfter+"</th><th>"+displayLastDay+"</th></tr>";
		    	
		    	//4:00am starts here
		    	html += "<tr>"; 
		    	html += "<th style='vertical-align:center;'>4:00am</th>";
		    	var hour = "4am";
		    	var todayData = searchDayAndTime(data, today,hour);
		    	if(todayData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+todayData.swell_height_metres+"mts @ "+todayData.swell_period_seconds+"s</h4> "+todayData.swell_direction_compass_point+ " " +todayData.swell_direction_degrees+"&deg;</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+todayData.wind_speed_knots+"kn</h4> "+todayData.wind_direction_compass_point+" "+todayData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var tomorrowData = searchDayAndTime(data, tomorrow,hour);
		    	if(tomorrowData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
			    	html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+tomorrowData.swell_height_metres+"mts @ "+tomorrowData.swell_period_seconds+"s</h4> "+tomorrowData.swell_direction_compass_point+" " +tomorrowData.swell_direction_degrees+"&deg;</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+tomorrowData.wind_speed_knots+"kn</h4> "+tomorrowData.wind_direction_compass_point+" "+tomorrowData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var dayAfterData = searchDayAndTime(data, dayAfter,hour);
		    	if(dayAfterData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+dayAfterData.swell_height_metres+"mts @ "+dayAfterData.swell_period_seconds+"s</h4> "+dayAfterData.swell_direction_compass_point+" " +dayAfterData.swell_direction_degrees+"&deg;</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+dayAfterData.wind_speed_knots+"kn</h4> "+dayAfterData.wind_direction_compass_point+" "+dayAfterData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var lastDayData = searchDayAndTime(data, lastDay,hour);
		    	if(lastDayData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+lastDayData.swell_height_metres+"mts @ "+lastDayData.swell_period_seconds+"s</h4> "+lastDayData.swell_direction_compass_point+" " +lastDayData.swell_direction_degrees+"&deg;</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+lastDayData.wind_speed_knots+"kn</h4> "+lastDayData.wind_direction_compass_point+" "+lastDayData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	html += "</tr>";
		    	//4:00am ends here
		    	
		    	//7:00am starts here
		    	html += "<tr>"; 
		    	html += "<th style='vertical-align:center;'>7:00am</th>";		    	
		    	var hour = "7am";
		    	var todayData = searchDayAndTime(data, today,hour);
		    	if(todayData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+todayData.swell_height_metres+"mts "+todayData.swell_direction_compass_point+"</h3> "+todayData.swell_direction_degrees+"&deg; @ " +todayData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+todayData.wind_speed_knots+"kn "+todayData.wind_direction_compass_point+"</h3> "+todayData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var tomorrowData = searchDayAndTime(data, tomorrow,hour);
		    	if(tomorrowData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
			    	html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+tomorrowData.swell_height_metres+"mts "+tomorrowData.swell_direction_compass_point+"</h3> "+tomorrowData.swell_direction_degrees+"&deg; @ " +tomorrowData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+tomorrowData.wind_speed_knots+"kn "+tomorrowData.wind_direction_compass_point+"</h3> "+tomorrowData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var dayAfterData = searchDayAndTime(data, dayAfter,hour);
		    	if(dayAfterData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+dayAfterData.swell_height_metres+"mts "+dayAfterData.swell_direction_compass_point+"</h3> "+dayAfterData.swell_direction_degrees+"&deg; @ " +dayAfterData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+dayAfterData.wind_speed_knots+"kn "+dayAfterData.wind_direction_compass_point+"</h3> "+dayAfterData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var lastDayData = searchDayAndTime(data, lastDay,hour);
		    	if(lastDayData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+lastDayData.swell_height_metres+"mts "+lastDayData.swell_direction_compass_point+"</h3> "+lastDayData.swell_direction_degrees+"&deg; @ " +lastDayData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+lastDayData.wind_speed_knots+"kn "+lastDayData.wind_direction_compass_point+"</h3> "+lastDayData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	html += "</tr>";
		    	//7:00am ends here
		    	
		    	
		    	//10:00am starts here
		    	html += "<tr>"; 
		    	html += "<th style='vertical-align:center;'>10:00am</th>";		    	
		    	var hour = "10am";
		    	var todayData = searchDayAndTime(data, today,hour);
		    	if(todayData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+todayData.swell_height_metres+"mts "+todayData.swell_direction_compass_point+"</h3> "+todayData.swell_direction_degrees+"&deg; @ " +todayData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+todayData.wind_speed_knots+"kn "+todayData.wind_direction_compass_point+"</h3> "+todayData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var tomorrowData = searchDayAndTime(data, tomorrow,hour);
		    	if(tomorrowData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
			    	html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+tomorrowData.swell_height_metres+"mts "+tomorrowData.swell_direction_compass_point+"</h3> "+tomorrowData.swell_direction_degrees+"&deg; @ " +tomorrowData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+tomorrowData.wind_speed_knots+"kn "+tomorrowData.wind_direction_compass_point+"</h3> "+tomorrowData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var dayAfterData = searchDayAndTime(data, dayAfter,hour);
		    	if(dayAfterData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+dayAfterData.swell_height_metres+"mts "+dayAfterData.swell_direction_compass_point+"</h3> "+dayAfterData.swell_direction_degrees+"&deg; @ " +dayAfterData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+dayAfterData.wind_speed_knots+"kn "+dayAfterData.wind_direction_compass_point+"</h3> "+dayAfterData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var lastDayData = searchDayAndTime(data, lastDay,hour);
		    	if(lastDayData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+lastDayData.swell_height_metres+"mts "+lastDayData.swell_direction_compass_point+"</h3> "+lastDayData.swell_direction_degrees+"&deg; @ " +lastDayData.swell_period_seconds+"s</td></tr><tr><td><h3>"+lastDayData.wind_speed_knots+"kn "+lastDayData.wind_direction_compass_point+"</h3> "+lastDayData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	html += "</tr>";
		    	//10:00am ends here
		    	
		    	//1:00pm starts here
		    	html += "<tr>"; 
		    	html += "<th style='vertical-align:center;'>1:00pm</th>";		    	
		    	var hour = "1pm";
		    	var todayData = searchDayAndTime(data, today,hour);
		    	if(todayData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+todayData.swell_height_metres+"mts "+todayData.swell_direction_compass_point+"</h3> "+todayData.swell_direction_degrees+"&deg; @ " +todayData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+todayData.wind_speed_knots+"kn "+todayData.wind_direction_compass_point+"</h3> "+todayData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var tomorrowData = searchDayAndTime(data, tomorrow,hour);
		    	if(tomorrowData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
			    	html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+tomorrowData.swell_height_metres+"mts "+tomorrowData.swell_direction_compass_point+"</h3> "+tomorrowData.swell_direction_degrees+"&deg; @ " +tomorrowData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+tomorrowData.wind_speed_knots+"kn "+tomorrowData.wind_direction_compass_point+"</h3> "+tomorrowData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var dayAfterData = searchDayAndTime(data, dayAfter,hour);
		    	if(dayAfterData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+dayAfterData.swell_height_metres+"mts "+dayAfterData.swell_direction_compass_point+"</h3> "+dayAfterData.swell_direction_degrees+"&deg; @ " +dayAfterData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+dayAfterData.wind_speed_knots+"kn "+dayAfterData.wind_direction_compass_point+"</h3> "+dayAfterData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var lastDayData = searchDayAndTime(data, lastDay,hour);
		    	if(lastDayData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+lastDayData.swell_height_metres+"mts "+lastDayData.swell_direction_compass_point+"</h3> "+lastDayData.swell_direction_degrees+"&deg; @ " +lastDayData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+lastDayData.wind_speed_knots+"kn "+lastDayData.wind_direction_compass_point+"</h3> "+lastDayData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	html += "</tr>";
		    	//1:00pm ends here
		    	
		    	//4:00pm starts here
		    	html += "<tr>"; 
		    	html += "<th style='vertical-align:center;'>4:00pm</th>";		    	
		    	var hour = "4pm";
		    	var todayData = searchDayAndTime(data, today,hour);
		    	if(todayData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+todayData.swell_height_metres+"mts "+todayData.swell_direction_compass_point+"</h3> "+todayData.swell_direction_degrees+"&deg; @ " +todayData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+todayData.wind_speed_knots+"kn "+todayData.wind_direction_compass_point+"</h3> "+todayData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var tomorrowData = searchDayAndTime(data, tomorrow,hour);
		    	if(tomorrowData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
			    	html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+tomorrowData.swell_height_metres+"mts "+tomorrowData.swell_direction_compass_point+"</h3> "+tomorrowData.swell_direction_degrees+"&deg; @ " +tomorrowData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+tomorrowData.wind_speed_knots+"kn "+tomorrowData.wind_direction_compass_point+"</h3> "+tomorrowData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var dayAfterData = searchDayAndTime(data, dayAfter,hour);
		    	if(dayAfterData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+dayAfterData.swell_height_metres+"mts "+dayAfterData.swell_direction_compass_point+"</h3> "+dayAfterData.swell_direction_degrees+"&deg; @ " +dayAfterData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+dayAfterData.wind_speed_knots+"kn "+dayAfterData.wind_direction_compass_point+"</h3> "+dayAfterData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	var lastDayData = searchDayAndTime(data, lastDay,hour);
		    	if(lastDayData == null){
		    		html+= "<td>No data</td>";
		    	}
		    	else{
		    		html+= "<td><table class='table table-hover'><tr><td><img src='../images/surficon.png' class='iconimg'/><h4>"+lastDayData.swell_height_metres+"mts "+lastDayData.swell_direction_compass_point+"</h3> "+lastDayData.swell_direction_degrees+"&deg; @ " +lastDayData.swell_period_seconds+"s</td></tr><tr><td><img src='../images/windicon.png' class='iconimg'/><h4>"+lastDayData.wind_speed_knots+"kn "+lastDayData.wind_direction_compass_point+"</h3> "+lastDayData.wind_direction_degrees+"&deg;</td></tr></table></td>";
		    	}
		    	html += "</tr>";
		    	//4:00pm ends here
		    	
		    	html += "</table></div>";
		    	$('#report').append(html);
    		},
    		error: function (){
    			throw "Unable to retrieve data from Swellnet.";
    		} 
		})
	
	//Pass day and hour. Ex:(data,monday,4am)	
	function searchDayAndTime(data,day,hour){		
		for(var i=0; i< data.three_hourly_forecasts.length; i++){
			var thisday = data.three_hourly_forecasts[i].local_day.toLowerCase().trim();
		    var thishour = data.three_hourly_forecasts[i].local_hour.trim();		    		
		    if(thisday == day && thishour == hour)
		    	return data.three_hourly_forecasts[i];
		}
		return null;
	}
		
}]);


