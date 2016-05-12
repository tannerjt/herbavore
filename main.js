$("#spatial_input").on('change', function (e) {
  var file = e.target.files[0];
  var split = file.name.split('.');
  var ext = split[split.length-1];
  var reader = new FileReader();
  var that = this;
  reader.onload = function(thefile) {
    switch(ext.toLowerCase()) {
      case 'csv':
        handleCSV(reader.result);
        break;
    }
  };
  if(file) {
    reader.readAsDataURL(file);
  }
});

function handleCSV(file) {
  var layer = omnivore.csv(file);
  layer.on('ready', function() {
    $("#output")[0].innerHTML = JSON.stringify(layer.toGeoJSON());
  })
}
