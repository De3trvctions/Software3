function testdata(data){

    console.log("Data Inside: " + data.data);
}

browser.runtime.onMessage.addListener(testdata);