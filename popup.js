// Actual code that's setting the data you see when you open the popup
function setCrimeData(city) {
    $("#location").text(city);

    var cityCrimeUrl = chrome.extension.getURL('data/city_crime.json');

    var cityXHR = new XMLHttpRequest();
    cityXHR.open('GET', cityCrimeUrl);

    cityXHR.onreadystatechange = function() {
        if (cityXHR.status === 200) {
            var results = $.parseJSON(cityXHR.responseText);
            if (results[city] === undefined) {
                $('#crime-data').hide();
                $('#crime-error').text('No crime data available for this city.');
            } else {
                $('#crime-error').text('');
                var years = Object.keys(results[city]);
                var maxYear = years[years.length - 1];
                $('#citystate').text(city);
                $('#year').text(maxYear);
                var dataItem = results[city][maxYear];
                $('#population').text(dataItem.population);
                $('#violent_crimerate').text(dataItem.violent_crimerate);
                $('#murder').text(dataItem.murder);
                $('#larceny').text(dataItem.larceny);
                $('#property').text(dataItem.property);
                $('#rape').text(dataItem.rape);
                $('#vehicular').text(dataItem.vehicular);
                $('#burglary').text(dataItem.burglary);
                $('#robbery').text(dataItem.robbery);
                $('#assault').text(dataItem.assault);
            }
        }
    };

    cityXHR.send();
}

// When the entire window's content is loaded (aka when all of the HTML/CSS is loaded), we will execute the following function.
window.addEventListener('DOMContentLoaded', function () {
    // Look for the active tab amongst Chrome's current tabs
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        // Send a message to the content script of the active tab that we would like to set the crime data
        chrome.tabs.sendMessage(
            tabs[0].id,
            {message: 'popup'},
            setCrimeData);
        });
    });