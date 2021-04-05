document.getElementById('changeWaxBtn').addEventListener('click', setCurrentWaxAddress)
getCurrentlySetWaxAddress();

function getCurrentlySetWaxAddress() {
    let waxAddress = localStorage.getItem('waxAddress')
    if (waxAddress) {
        document.getElementById('waxAddressDisplay').innerText = 'Your WAX address is set to ' + waxAddress
    }
}

function setCurrentWaxAddress() {
    let waxAddress = document.getElementById('waxAddress').value;
    console.log(waxAddress);
    localStorage.setItem('waxAddress', waxAddress);
    getCurrentlySetWaxAddress();
}
