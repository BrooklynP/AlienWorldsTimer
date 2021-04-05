document.getElementById('changeWaxBtn').addEventListener('click', setCurrentWaxAddress)
getCurrentlySetWaxAddress();

function getCurrentlySetWaxAddress() {
    let waxAddress = localStorage.getItem('waxAddress')
    if (waxAddress) {
        document.getElementById('waxAddressDisplay').innerText = 'Your WAX address is set to ' + waxAddress
    }
    // chrome.storage.local.get(['waxAddress'], function (result) {
    //     console.log('Value currently is ' + result.key);
    //     if (result.key) {
    //         document.getElementById('waxAddressDisplay').innerText = 'Your WAX address is set to ' + result.key
    //     }
    // });
}

function setCurrentWaxAddress() {
    let waxAddress = document.getElementById('waxAddress').value;
    console.log(waxAddress);
    localStorage.setItem('waxAddress', waxAddress);
    getCurrentlySetWaxAddress();
    // chrome.storage.local.set({ 'waxAddress': waxAddress }, function (result) {
    //     console.log(result);
    //     console.log('Value currently is ' + result.key);
    //     getCurrentlySetWaxAddress();
    // });
}
