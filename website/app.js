
let d = new Date();

let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const buttonQuery = document.getElementById('generate');

const cityValue = document.querySelector('#zip');

const entryholder = document.querySelector('.entryholder');

const apiKey = '33191412c1be9388ffa9ffe295d61a12';

const projectData = {};

// GET Weather Function
	const getData = async (url='') =>{
		
		url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue.value}&appid=`;
		
		const request = await fetch(url+apiKey);

		try {

		const allData = await request.json()

		if (allData.cod == 200){

		projectData.city = allData.name;;
		projectData.content = allData.weather[0].main;
		projectData.temp = Math.round(allData.main.temp - 273.15);
		projectData.date = newDate;
		let today = document.getElementById('feelings').value;
		projectData.fav = today;

		postData('/add', projectData);
		setTimeout(function(){
			getAll()
		},1500);

		} else {
		document.getElementById('city').innerText = 'Please Enter a City';
		}

		}
		catch(error) {
		console.log("error", error);
		}

	};


buttonQuery.addEventListener('click', function(){
	getData();
});


// Post Weather Query to Server 

const postData = async ( url = '', data = {})=>{

	const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),      
  }).then(res => {
  	return data;
  });

}

// load the data array from server

const getAll = async (url ='/all') =>{

	const request = await fetch(url);

	try{

		const allarraydata = request.json();
		const arraydata = Promise.resolve(allarraydata);

		let showarray = [];
		arraydata.then(function(result){
			for(let arr of result){
				showarray.push(`<div class="date">${arr.date}</div>`);
				showarray.push(`<div class="city">${arr.city}</div>`);
				showarray.push(`<div class="content">${arr.content}</div>`);
				showarray.push(`<div class="temp">${(Math.round(arr.temp) + "℃")}</div>`);
				showarray.push(`<div class="fav">${arr.fav}</div>`);
				showarray.push(`<br />`);
				entryholder.innerHTML = showarray.join(" ")
			}
		})
	}

	catch {
		console.log('error', error);
	}

}

