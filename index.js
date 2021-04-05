document.getElementById('changeWaxBtn').addEventListener('click', setCurrentWaxAddress)
getCurrentlySetWaxAddress();
getTimeUntilNextMine();

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

function getTimeUntilNextMine() {
    let timeUntilNextMineString = localStorage.getItem('nextMineTime');
    let timeUntilNextMine = new Date(timeUntilNextMineString);
    document.getElementById('nextMine').innerText = timeUntilNextMine.toLocaleTimeString();
}