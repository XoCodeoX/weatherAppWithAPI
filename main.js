//GLOBAL VARIABLES

const btn = document.getElementById('start');
const board = document.getElementById('wrapper');
const tabOfLocalizationInfo = document.querySelectorAll('.location p');
const tabOfWeatherInfo = document.querySelectorAll('.degree-section p');
let flag = true;


btn.addEventListener('click', () => {

    //LOCAL VARIABLE FOR LOCALIZATION COORDINATES
    let longitude;
    let latitude;

    //INSTRUCTION USED TO CHECKING :: IF USER DONT ACCEPT AGREEMENTS OF COORDINATES, SHOW ALERT

    if (flag) {
        navigator.geolocation.getCurrentPosition(position => {

            board.style.opacity = 1;
            btn.style.display = "none";

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            //CREATE API CONST VARIABLE WITH WEATHERAPI URL

            const api = `http://api.weatherstack.com/current?access_key=6648063e77a895e780fa182bff5ab735&query=${latitude},${longitude}`

            //RETURN JSON FORMAT DATA

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {

                    //DESTRUCT...

                    const { timezone_id, localtime, name, country } = data.location;

                    const { weather_descriptions, temperature, wind_speed } = data.current;

                    //ADD DATA FROM API TO ARRAYS

                    let tabOfData = [timezone_id, localtime, name, country];

                    let tabOfTemp = [weather_descriptions, temperature, wind_speed];

                    //ITERATION ON ARRAYS AND ADD VALUES BY FOREACH

                    tabOfLocalizationInfo.forEach((element, index) => {
                        element.textContent = tabOfData[index];
                    })

                    tabOfWeatherInfo.forEach((element, index) => {
                        switch (index) {
                            case 0:
                                element.textContent = `This day is ${tabOfTemp[index]} `;
                                break;

                            case 1:
                                element.textContent = `Temperature is:  ${tabOfTemp[index]} C`;
                                break

                            case 2:
                                element.textContent = `Wind speed: ${tabOfTemp[index]} km/h`;
                                break;

                        }
                    })
                })
        });
        flag = !flag;

    }

    else {
        return alert('We have a problem with your coordinates, refresh page and agree to geoloaction')
    }

});

