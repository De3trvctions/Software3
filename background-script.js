chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.hello) {
          console.log('hello received');
      }
  });