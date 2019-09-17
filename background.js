// If the type of the file is not specified in the url, this is the default data type to use
let fileNameExtension = "png";

// For disabling the download bar.
let disableShelf = () => chrome.downloads.setShelfEnabled(false);


function save(completeUrl) {
  // Checks whether the file type is defined.
  if(completeUrl.split(".").pop().length > 1 && completeUrl.split(".").pop().length < 6){
    fileNameExtension = completeUrl.split('.').pop().split()[0];
  }

  // temporary solution for the problem of the file type "com"
  if(fileNameExtension === "com"){
    fileNameExtension = "png";
  }

  // Downloads the image
  chrome.downloads.download({
          url: completeUrl,
          conflictAction: "overwrite", // Overwrites the file if the file already exists
          filename: "chromePhotos/" + completeUrl.replace(/[^a-z0-9]/gi, '_').toLowerCase() + "." + fileNameExtension
                  // Download directory + url of a file + file name extension
      },function() {
        disableShelf();
      });
}



chrome.webRequest.onCompleted.addListener(function(details){

  // Checks the type of data
  if(details.type === "image"){
    save(details.url)
  }

},{urls:  [ "<all_urls>" ]});
