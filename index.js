const bitcoinEl = document.getElementById("bitcoin");

try {
  const res = await fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=aturen"
  );
  if (!res.ok) {
    throw Error("Something went wrong");
  }
  const data = await res.json();
  document.body.style.backgroundImage = `url(${data.urls.regular})`;
  document.getElementById("author").textContent = `By: ${data.user.name}`;
} catch (error) {
  document.body.style.backgroundImage = `url(./images/wallpaper.jpg)`;
//   document.getElementById("author").textContent = `By: Dodi Achmad`;
}

try {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/zignaly");
  if (!res.ok) {
    throw Error("Something went wrong");
  }
  const data = await res.json();
  document.getElementById("zignaly").innerHTML = `
        <td class="imageName"><img src="${data.image.small}" alt="coin image"/>${data.name}</td>
    `;
  document.getElementById("zignaly").innerHTML += `
        <td><i class="ri-focus-2-line"></i> $${data.market_data.current_price.usd}</td>
        <td><i class="ri-arrow-up-s-fill"></i> $${data.market_data.high_24h.usd}</td>
        <td><i class="ri-arrow-down-s-fill"></i> $${data.market_data.low_24h.usd}</td>
        `;
} catch (error) {
  console.error(error);
}

try {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
  if (!res.ok) {
    throw Error("Something went wrong");
  }
  const data = await res.json();
  document.getElementById("bitcoin").innerHTML = `
        <td class="imageName"><img src="${data.image.small}" alt="coin image"/>${data.name}</td>
    `;
  document.getElementById("bitcoin").innerHTML += `
        <td><i class="ri-focus-2-line"></i> $${data.market_data.current_price.usd}</td>
        <td><i class="ri-arrow-up-s-fill"></i> $${data.market_data.high_24h.usd}</td>
        <td><i class="ri-arrow-down-s-fill"></i> $${data.market_data.low_24h.usd}</td>
    `;
} catch (error) {
  console.error(error);
}

function getCurrentTime() {
  const time = new Date();
  const date = new Date(Date.now() - time);
  document.getElementById("time").textContent = time.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}
setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition(async (position) => {
  try {
    const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
    );
    if (!res.ok) {
      throw Error("Weather data not available");
    }
    const data = await res.json();
    const celsius = (data.main.temp - 32) * 5/9;
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(celsius)}º</p>
            <p class="weather-city">${data.name}</p>
        `;
  } catch (error) {
    console.error(error);
  }
});