(function() {
    const inputField = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const weatherDiv = document.getElementById('weatherDisplay');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    
    const BASE_URL = 'https://goweather.herokuapp.com/weather/';

    console.log('🚀 App initialized');
    
    function getHistoryFromStorage() {
        let stored = localStorage.getItem('weatherCities');
        return stored ? JSON.parse(stored) : [];
    }

    function saveHistoryToStorage(cities) {
        localStorage.setItem('weatherCities', JSON.stringify(cities));
        console.log('💾 History saved:', cities);
    }

    function renderHistory() {
        const cities = getHistoryFromStorage();
        historyList.innerHTML = '';
        
        if (cities.length === 0) {
            historyList.innerHTML = '<li class="no-history">No searches yet</li>';
            return;
        }
        
        cities.forEach(city => {
            const li = document.createElement('li');
            li.className = 'history-item';
            li.textContent = city;
            li.addEventListener('click', () => {
                console.log('📜 History clicked:', city);
                inputField.value = city;
                fetchWeather(city);
            });
            historyList.appendChild(li);
        });
    }

    function addCityToHistory(city) {
        if (!city || city.trim() === '') return;
        let cities = getHistoryFromStorage();
        cities = cities.filter(c => c.toLowerCase() !== city.toLowerCase());
        cities.unshift(city);
        if (cities.length > 5) cities.pop();
        saveHistoryToStorage(cities);
        renderHistory();
    }

    function getWeatherIcon(condition) {
        condition = condition.toLowerCase();
        if (condition.includes('sun') || condition.includes('clear')) return '☀️';
        if (condition.includes('cloud')) return '☁️';
        if (condition.includes('rain')) return '🌧️';
        if (condition.includes('snow')) return '❄️';
        if (condition.includes('storm') || condition.includes('thunder')) return '⛈️';
        if (condition.includes('wind')) return '💨';
        if (condition.includes('fog') || condition.includes('mist')) return '🌫️';
        if (condition.includes('partly')) return '⛅';
        return '🌡️';
    }

    function showWeatherData(data, cityName) {
        const temp = data.temperature || 'N/A';
        const condition = data.description || 'Weather data';
        const wind = data.wind || 'N/A';
        const icon = getWeatherIcon(condition);
        
        weatherDiv.innerHTML = `
            <div class="weather-card">
                <div class="weather-header">
                    <span class="city-name">${cityName}</span>
                    <span class="weather-icon">${icon}</span>
                </div>
                <div class="weather-temp">${temp}</div>
                <div class="weather-condition">${condition}</div>
                <div class="weather-details">
                    <div class="detail-item">
                        <div class="detail-label">Wind</div>
                        <div class="detail-value">${wind}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Humidity</div>
                        <div class="detail-value">65%</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Feels Like</div>
                        <div class="detail-value">${temp}</div>
                    </div>
                </div>
            </div>
        `;
        console.log('✅ Weather displayed for:', cityName);
    }

    function showError(message) {
        weatherDiv.innerHTML = `
            <div class="error-card">
                <i>⚠️</i>
                <p>${message}</p>
            </div>
        `;
        console.log('❌ Error:', message);
    }

    async function fetchWeather(city) {
        console.log('🔍 Fetching weather for:', city);
        
        if (!city || city.trim() === '') {
            showError('Please enter a city name');
            return;
        }

        weatherDiv.innerHTML = '<div class="loading">⏳ Loading weather data...</div>';

        try {
            console.log('📡 Making API call...');
            const response = await fetch(BASE_URL + encodeURIComponent(city));
            
            if (!response.ok) throw new Error('City not found');
            
            const data = await response.json();
            console.log('📦 API Response:', data);
            
            if (!data.temperature || data.temperature === '') {
                throw new Error('No weather data available');
            }
            
            showWeatherData(data, city);
            addCityToHistory(city);
        } catch (error) {
            showError(error.message);
        }
    }

    searchBtn.addEventListener('click', () => {
        console.log('🔘 Search button clicked');
        fetchWeather(inputField.value.trim());
    });

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log('↵ Enter key pressed');
            searchBtn.click();
        }
    });

    clearHistoryBtn.addEventListener('click', () => {
        console.log('🗑️ Clearing history');
        localStorage.removeItem('weatherCities');
        renderHistory();
    });

    window.addEventListener('load', () => {
        console.log('📄 Page loaded');
        renderHistory();
        fetchWeather('London');
    });

    Promise.resolve().then(() => console.log('⚡ Microtask executed'));
    setTimeout(() => console.log('⏰ Macrotask executed'), 0);
})();