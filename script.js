document.querySelector('.busca').addEventListener('submit', async (e)=>{
  e.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if(input !== ''){
    clearInfo();
    showWarning('Carregando...');
  
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=963d60ac28dfc0bc1d1893437c157d1c&units=metric&lang=pt_br`;
    let results = await fetch(url);
    let json = await results.json();

    if(json.cod === 200){
      showInfo({
        nome: json.name,
        pais: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        ventoVelocidade: json.wind.speed,
        ventoAngulo: json.wind.deg
        
      });
      
    }
    else{
      clearInfo();
      showWarning('<strong>Ops!</strong> Não encontramos esta localização.');
    }
  }

  });


function showInfo (jsn){
  showWarning('');

  document.querySelector('.resultado').style.display = 'block';
  document.querySelector('.titulo').innerHTML = `${jsn.nome}, ${jsn.pais}`;
  document.querySelector('.tempInfo').innerHTML = `${jsn.temp} <sup>ºC</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${jsn.ventoVelocidade}<span>km/h</span>`;
  document.querySelector('.ventoPonto').style.transform = `rotate(${jsn.ventoAngulo-90}deg)`;
  document.querySelector('.temp img').setAttribute('src',`https://openweathermap.org/img/wn/${jsn.tempIcon}.png`)
}

function clearInfo (){
  showWarning('');
  document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg){
  document.querySelector( '.aviso' ).innerHTML = msg
}