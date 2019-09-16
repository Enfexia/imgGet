var fileNameExtension;
let disableShelf = () => chrome.downloads.setShelfEnabled(false);



function save(completeUrl) {

  if(completeUrl.split(".").pop().length > 1 && completeUrl.split(".").pop().length < 6){
    fileNameExtension = completeUrl.split('.').pop().split()[0];
  }

  if(fileNameExtension === undefined){
    fileNameExtension = "png";
  }
  
  chrome.downloads.download({
          url: completeUrl,
          conflictAction: "overwrite",
          filename: "chromePhotos/" + completeUrl.replace(/[^a-z0-9]/gi, '_').toLowerCase() + "." + fileNameExtension
      },function() {
        disableShelf();
      });
}


chrome.webRequest.onCompleted.addListener(function(details){

  if(details.type === "image"){
    save(details.url)
  }

},{urls:  [ "<all_urls>" ]});
