const fill = document.getElementById('result');
const button = document.getElementById('btn');

const sendData = ()=>{
	const url = document.getElementById('original_url').value;
	console.log(url);
	axios.post('http://localhost:3000/', {
		original_url:url
	})
	.then((response)=>{
		console.log(response.data);
		fill.innerHTML=response.data;
	});
};

button.addEventListener('click', sendData);