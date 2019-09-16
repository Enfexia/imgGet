
let disableShelf = () => chrome.downloads.setShelfEnabled(false);



function save(completeUrl) {
  chrome.downloads.download({
          url: completeUrl,
          conflictAction: "overwrite",
          filename: "chromePhotos/" + completeUrl.replace(/[^a-z0-9]/gi, '_').toLowerCase()
      },function() {
        disableShelf();
      });
}


chrome.webRequest.onCompleted.addListener(function(details){

  if(details.type === "image"){
    save(details.url)
  }

},{urls:  [ "<all_urls>" ]});
