const container = document.querySelector('.container');
const search = document.querySelector('.searchbox button');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');


search.addEventListener('click', () => {
    const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091';
    const city = document.querySelector('.searchbox input').value; // Changed Value to value

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found'); // Handle error
            }
            return response.json();
        })
        .then(json => {
            // Show the weather box
            
            

            const image = document.querySelector('.weather-box .weather img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Set the correct image based on the weather condition
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.jpg'; // Fixed image assignment
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds': // Updated 'Cloud' to 'Clouds' to match API response
                    image.src = 'images/cloud.png';
                    break;

                case 'Mist':
                case 'Haze':
                    image.src = 'images/mist.jpg';
                    break;

                default:
                    image.src = 'images/cloud1.png';
            }

            // Update weather details
            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`; // Using Math.round for better rounding
            description.innerHTML = json.weather[0].description.charAt(0).toUpperCase() + json.weather[0].description.slice(1); // Capitalize first letter
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.round(json.wind.speed)} km/h`;
        })
        .catch(error => {
            // Show error message
            container.style.height = '400px';
            weatherbox.classList.remove('active');
            weatherdetails.classList.remove('active');
            error404.classList.add('active');
            alert(error.message); // Alert user on error
        });
});
