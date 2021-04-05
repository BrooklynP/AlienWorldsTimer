function checkIfMineReady(timeToCheck) {
    setTimeout(() => {
        console.log("Checking if mine ready");
        let waxAddress = localStorage.getItem('waxAddress');
        fetch('https://awstats.io/mining/miner/24/' + waxAddress)
            .then(response => response.text())
            .then(data => {
                let newData = data.split('<table border="0" class="dataframe w3-table w3-hoverable w3-light-grey top-miner-table" id="all-mines-table">')[1].split('<tbody>')[1].split('<tr>')[1].split('<td>');
                let mineDate = newData[3].replace('</td>', '').replace(' ', 'T').trim() + 'Z';
                mineDate = new Date(mineDate);
                let mineCooldown = parseInt(newData[6].replace('</td>', '').trim());
                let now = new Date();
                let mineReset = new Date(mineDate.getTime() + (mineCooldown * 1000))
                if (now > mineReset) {
                    console.log("Mine ready");
                    alert("You're ready to mine");
                    checkIfMineReady(10000)
                }
                else{
                    console.log("Mine not ready, ready at ", mineReset);
                    console.log("Checking again in ", mineReset - now)
                    checkIfMineReady(mineReset - now);
                }
            }).catch(error => { console.error(error) })
    }, timeToCheck);
}
checkIfMineReady(10000);
