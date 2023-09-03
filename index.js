
window.onload= getUserLocation();



// const button = document.getElementById('fetchData-btn');
// button.addEventListener('click', () => {
//     getUserLocation()
//     window.location.href = './fetchDataPage.html'
// })

function getUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.log("Geolocation is not available in this browser.");
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);

        // fetch call using given lat and long
        fetchData(latitude, longitude)

    }

    function error(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log("Permission Denied");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information not available.");
                break;
            case error.TIMEOUT:
                console.log("Request time out.");
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                break;
        }
    }
}


const fetchData = (lat, lon) => {
    const apiKey = '631fc5646580178e0db09ba1613eca0f'
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

    fetch(api).then(res => res.json()).then(data => {
        console.log(data)

        const { name, coord, timezone, main, wind } = data

        // lat long push
        const latitude = document.getElementById('lat');
        const longitude = document.getElementById('long');
        latitude.textContent = `Lat : ${coord.lat}`;
        longitude.textContent = `Long : ${coord.lon}`;

        // weather data 
        const dataContainer = document.getElementById('data-container')


        const location = document.createElement('div')
        location.classList.add('data')
        location.textContent = `Location: ${name}`

        const windSpeed = document.createElement('div')
        windSpeed.classList.add('data')
        windSpeed.textContent = `Wind Speed: ${wind.speed}Kmph`;

        const humidity = document.createElement('div')
        humidity.classList.add('data')
        humidity.textContent = `Humidity: ${main.humidity}`

        const timeZone = document.createElement('div')
        timeZone.classList.add('data')
        timeZone.textContent = `Time Zone: ${timezone}`

        const pressure = document.createElement('div')
        pressure.classList.add('data')
        pressure.textContent = `Pressure:${main.pressure}atm`

        const direction = document.createElement('div')
        direction.classList.add('data')
        direction.textContent = `Wind Direction: ${getWindDirection(wind.deg)}`

        const feelslike = document.createElement('div')
        feelslike.classList.add('data')
        feelslike.textContent = `Feels Like: ${main.feels_like} Deg C`

        dataContainer.appendChild(location)
        dataContainer.appendChild(windSpeed)
        dataContainer.appendChild(humidity)
        dataContainer.appendChild(timeZone)
        dataContainer.appendChild(pressure)
        dataContainer.appendChild(direction)
        dataContainer.appendChild(feelslike)

        const map = document.getElementById('map')
        map.src = `https://maps.google.com/maps?q=${coord.lat}, ${coord.lon}&z=15&output=embed`;
       
        

    }).catch(err => {
        console.error('Error fetching data', err);
    })

}

const navigateToNextPage = () =>{
    window.location.href = './fetchDataPage.html'
}

function getWindDirection(degrees) {
    const directions = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest"];
    const index = Math.round(degrees / 45) % 8; // Divide by 45 degrees and take the modulo to get the index
    return directions[index];
}

