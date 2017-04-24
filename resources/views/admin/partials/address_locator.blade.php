<div ng-app="mapLocator" ng-controller = "MapCtrl">
  <div class="row form-group">
    {!! Form::label('address:',null,['class' => 'control-label col-md-4']) !!}
    <div class="col-md-6">
      <input class="form-control" placeholder="Enter address" type="text" ng-model="data.adress" required>
    </div>
  </div>

  <div class="row">
    <div class="col-md-6 col-md-offset-4">
      <ui-gmap-google-map center='map.center' zoom='map.zoom' options="map.options">                   
          <ui-gmap-marker idKey='0' coords='map.marker.coords' icon='map.marker.icon'  options = 'map.marker.options' ></ui-gmap-marker>
      </ui-gmap-google-map>
    </div>
  </div>

  <div class="row">
    <div class="col-md-4 text-right"><strong>Formated address: </strong></div>
    <div class="col-md-6">{[{data.formatted_address}]}<input class="hidden" type="text" name="adress" ng-model="data.formatted_address" required></div>
  </div>
  <div class="row">
    <div class="col-md-4 text-right"><strong>Address type: </strong></div>
    <div class="col-md-6">{[{data.type_address}]}<input class="hidden" type="text" name="type_address" ng-model="data.type_address" ></div>
  </div>
  <div class="row">
    <div class="col-md-4 text-right"><strong>City: </strong></div>
    <div class="col-md-6">{[{data.city}]}<input class="hidden" type="text" name="city" ng-model="data.city" ></div>
  </div>
  <div class="row">
    <div class="col-md-4 text-right"><strong>Country: </strong></div>
    <div class="col-md-6">{[{data.country}]}<input class="hidden" type="text" name="country" ng-model="data.country" ></div>
  </div>
  <div class="row">
    <div class="col-md-4 text-right"><strong>Latitude: </strong></div>
    <div class="col-md-6">{[{data.latitude}]}<input class="hidden" type="text" name="latitude" ng-model="data.latitude" ></div>
  </div>
  <div class="row">
    <div class="col-md-4 text-right"><strong>Longitude: </strong></div>
    <div class="col-md-6">{[{data.longitude}]}<input class="hidden" type="text" name="longitude" ng-model="data.longitude" ></div>
  </div>
  
</div>


<script src='//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.2/lodash.min.js'></script>
<script src='//maps.googleapis.com/maps/api/js?sensor=false'></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.min.js"></script>  
<script src='//cdnjs.cloudflare.com/ajax/libs/angular-google-maps/2.1.1/angular-google-maps.min.js'></script>


<script>
		var app = angular.module('mapLocator', ['uiGmapgoogle-maps']); 
		
    app.config(  function(uiGmapGoogleMapApiProvider,$interpolateProvider) {		  

			$interpolateProvider.startSymbol('{[{').endSymbol('}]}');

		    uiGmapGoogleMapApiProvider.configure({
		        //    key: 'your api key',
		        v: '3.17',
		        libraries: 'weather,geometry,visualization'
		    });
		});

		app.controller('MapCtrl', function($scope,$filter,$timeout,$rootScope,uiGmapGoogleMapApi,$http) {
		 
		  $scope.data = {
		    type_address:"",
		    formatted_address:"",
		    adress:"",
		    latitude:"",
		    longitude : "",
		    city: "",
		    country: "",
		  }
		  
		  $scope.geocoder = [];
		
		  // GEOCODING AND FIND PRECISE LOCATION
		  $scope.$watch('[data.adress]', function () { 

		  	console.log("data.adress",$scope.data.adress)

		    var location = {
		      address : $scope.data.adress,
		      key : 'AIzaSyDOPrdHsFcrPF6scET99GvmIEQe9JqnTCU',
		      language : 'en'
		    }

		    $http({
		      method: 'GET',
		      url: 'https://maps.googleapis.com/maps/api/geocode/json',
		      headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
		      params: location
		    })
		    .success(function(data) {

		      console.log("geo results",data);		      	      

		      if(data.status != "ZERO_RESULTS")
		      {
		        $scope.data.formatted_address = data.results[0].formatted_address;
		      	$scope.data.type_address  = data.results[0].types[0];
		      	console.log("result",$scope.data.formatted_address,$scope.data.type_address)	            

		      	$scope.geocoder = data.results[0];
		        $scope.is_location_found = true;
		        //console.log("type",data.results[0].types[0])
		        //console.log("location",data.results[0].geometry.location)
		        $scope.map.center.latitude = $scope.map.marker.coords.latitude = $scope.data.latitude = data.results[0].geometry.location.lat
		        $scope.map.center.longitude = $scope.map.marker.coords.longitude = $scope.data.longitude = data.results[0].geometry.location.lng
		        $scope.map.zoom = 16;
		        $scope.map.marker.options.visible=true;

		        angular.forEach(data.results[0].address_components, function(address_component,i) {
			      
			      //console.log(i,address_component.types[0],address_component.long_name)
			      
			      if (address_component.types[0] == "locality"){
			         $scope.data.city = address_component.long_name;
			      }

			      if (address_component.types[0] == "country"){ 
			          $scope.data.country  = address_component.long_name;
			      }

			      if (address_component.types[0] == "postal_code"){ 
			          $scope.data.zipcode = address_component.long_name;
			      }

			    });
		      }
		      else
		      {
		        $scope.is_location_found = false;
		        $scope.data.formatted_address = ""
		      	$scope.data.type_address  = ""		      
			    $scope.data.latitude  = ""
			    $scope.data.longitude   = ""
			    $scope.data.city  = ""
			    $scope.data.country  = ""
		        //console.log("location",data.status);
		        $scope.map.zoom = 1;
		        $scope.map.marker.options.visible=false;
		      }

		    })
		    .error(function(data) {
		      console.log(data);
		    });
		  }, true);

		  // INIT MAP 
		  uiGmapGoogleMapApi
		  .then(function(maps){
		      $scope.map = { 
		        center: { latitude:$scope.data.latitude, longitude: $scope.data.longitude }, 
		        zoom: 16,
		        options:{
		          minZoom:1
		        },
		        marker : {
		          infoWindow : false,
		          coords: {
		            latitude: $scope.data.latitude,
		            longitude: $scope.data.longitude,
		          },
		          // icon:{url: "../../../img/map/marker-blue.png" },
		          options:{
		            //animation : google.maps.Animation.DROP, // BOUNCE
		            visible:false
		          }
		        }
		      }
		  });  
		})

	</script>