$("#spatial_input").on('change', function (e) {
  var fileDetails = {
    size: null,
    name: null,
    type: null
  };
  var file = e.target.files[0];

  fileDetails.size = file.size + " bytes";
  fileDetails.type = file.type;
  fileDetails.name = file.name;
  $("#details")[0].innerHTML = JSON.stringify(fileDetails);

  var split = file.name.split('.');
  var ext = split[split.length-1];

  var reader = new FileReader();
  var that = this;
  reader.onload = function(thefile) {
    switch(ext.toLowerCase()) {
      case 'csv':
        handleCSV(reader.result);
        break;
      case 'kml':
        handleKML(reader.result);
        break;
      case 'geojson':
        handleGeoJSON(reader.result);
        break;
      case 'topojson':
        handleTopoJSON(reader.result);
        break;
      case 'gpx':
        handleGPX(reader.result);
        break;
      default:
        notRecognized(ext);
        break;
    }
  };

  if(file) {
    reader.readAsDataURL(file);
  }
});

function notRecognized(ext) {
  console.warn(ext + ' is not a recognized format.  Please use .geojson, .topojson, .kml, .csv, or .gpx');
}

function handleGPX(file) {
  var layer = omnivore.gpx(file);
  report(layer);
}

function handleTopoJSON(file) {
  var layer = omnivore.topojson(file);
  report(layer);
}

function handleGeoJSON(file) {
  var layer = omnivore.geojson(file);
  report(layer);
}

function handleKML(file) {
  var layer = omnivore.kml(file);
  report(layer);
}

function handleCSV(file) {
  var layer = omnivore.csv(file);
  report(layer);
}

function report(layer) {
  layer.on('ready', function() {
    $("#output")[0].innerHTML = JSON.stringify(layer.toGeoJSON());
  })
}
