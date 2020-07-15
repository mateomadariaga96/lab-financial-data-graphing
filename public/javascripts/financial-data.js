// index.js

const key = 'demo';
const functionName = 'TIME_SERIES_DAILY';
const symbolName = 'MSFT';


const fromInput = document.querySelector('#from')
const toInput = document.querySelector('#to')


function getApiUrl() {
	const toValue = toInput.value
	const fromValue = fromInput.value
	//console.log(`FROM: ${fromValue} / TO: ${toValue}`)
	const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromValue}&end=${toValue}`
	return apiUrl
}

toInput.addEventListener('change', () => {
	axios
  .get(getApiUrl())
  .then(responseFromAPI => {
	  console.log(responseFromAPI.data);
	printTheChart(responseFromAPI.data); // <== call the function here where you used to console.log() the response
  })
  .catch(err => console.log('Error while getting the data: ', err));

function printTheChart(stockData) {
  const dailyData = stockData['bpi'];

  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map(date => dailyData[date]);

  const ctx = document.getElementById('my-chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockDates,
      datasets: [
        {
          label: 'Stock Chart',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderColor: 'rgba(0, 0, 0, 0.6)',
          data: stockPrices
        }
      ]
    }
  }); // closes chart = new Chart()
} // closes printTheChart()
})






  