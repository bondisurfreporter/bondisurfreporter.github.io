var bondiSurfReportServices = angular.module('bondiSurfReportServices', ['ngResource']);

bondiSurfReportServices.factory('Report', ['$http','$resource',
  function($http,$resource){
  	$http.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
	$http.defaults.headers.common["Access-Control-Allow-Headers"] = "application/json"
	
  	
  	var url = "http://swellcast.com.au/api/v1/locations/sydney-surf-report.json?api_key=qRL8TDrA7CsbEktt8Lnu";
    return $resource(url, {}, {
      query: {
      	url: url,
    		async: false,
		    dataType: 'JSONP',
    		jsonpCallback: 'callback',
	    	type: 'GET',
	    	success: function (data) {			    	
		    	return angular.toJson(data);
    		},
    		error: function (){
    			throw "Unable to retrieve data from Swellnet.";
    		} 
      }
    });
  }]);