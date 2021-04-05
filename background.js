setTimeout(() => {
    let waxAddress = localStorage.getItem('waxAddress');
    // alert(waxAddress);
    console.log(waxAddress);
    fetch('https://awstats.io/mining/miner/24/' + waxAddress)
        .then(response => response.text())
        .then(data => { console.log(data); }).catch(error=>{console.error(error)})
}, 10000);