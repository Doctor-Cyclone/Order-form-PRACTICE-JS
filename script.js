//Объявление переменных ↓
let name = "";
let surname = "";
let phone = "";
let number = "";
let price = document.getElementById("price");

const allOrder = document.getElementById("all-order");
const sumOfOrder = document.getElementById("sum-of-orders");
const minOrder = document.getElementById("minimum-order-amount");
const maxOrder = document.getElementById("maximum-order-amount");
const orderBtn = document.getElementById("order-drink-btn");
const drinkArray = document.getElementsByName("drink");

//Вывод на экран кнопки "Добавть заказ" ↓
orderBtn.innerHTML = '<button class = "add-order-btn" id = "addOrder" onclick = "checkFields()">Add order</button>';

//Получение базы данных из Локального хранилища ↓
let dataBase = JSON.parse(localStorage.getItem('Order'));

//Общая статистика по данным ↓
const commonData = () => {
	totalNumberOfOrders();
	sumOfAllOrders();
	minimumOrderAmount();
	maximumOrderAmount();

	//Всего заказов
	function totalNumberOfOrders(){
		if(dataBase != ""){
			allOrder.innerHTML = dataBase.length;
		}else{
			allOrder.innerHTML = "There are no orders in the database yet.";
		}
	}
	//Общая сумма заказов
	function sumOfAllOrders(){
		let totalSum = 0;
		if(dataBase != ""){
			for(let i = 0; i < dataBase.length; i++){
				totalSum += +(dataBase[i].Order.price);
			}
			sumOfOrder.innerHTML = totalSum;
		}else{
			sumOfOrder.innerHTML = "There are no orders in the database yet.";
		}
	}
	//Минимальный заказ
	function minimumOrderAmount(){
		if(dataBase[0]){
			let min = dataBase[0].Order.price;
			for (let i = 1; i < dataBase.length; i++) {
				if (dataBase[i].Order.price < min) {
					min = dataBase[i].Order.price;
				}
			}
			minOrder.innerHTML = min;	
		}else{
			minOrder.innerHTML = "There are no orders in the database yet.";
		}
	}
	//Максимальный заказ
	function maximumOrderAmount(){
		if(dataBase[0]){
			let max = dataBase[0].Order.price;
			for (let i = 1; i < dataBase.length; i++) {
				if (dataBase[i].Order.price > max) {
					max = dataBase[i].Order.price;
				}
			}
			maxOrder.innerHTML = max;
		}else{
			maxOrder.innerHTML = "There are no orders in the database yet.";
		}
	}
};

//Вывод базы данных в таблицу ↓
const createTable = dataBase => {
	const tableClient = dataBase.map(
		function(client){
			return(
				'<tr>' + 
					'<td>' + client.id + '</td>' +
					'<td>' + client.name + '</td>' +
					'<td>' + client.Order.drink + '</td>' +
					'<td>' + client.Order.number + '</td>' +
					'<td>' + client.Order.price + '</td>' +
					'<td class = "tdActionBtn">' + 
					'<button class = "delBtn" onclick = "removeClient(' + client.id + ')"><i class="far fa-trash-alt"></i></button>' + 
					'<button class = "delBtn" onclick = "editClient(' + client.id + ')"><i class="fas fa-user-edit"></i></button>' +
					'</td>' +
				'</tr>'	
			)
		}
	).join('');
	document.getElementById("tBody").innerHTML = tableClient;
};

//ВЫВОД ТАБЛИЦЫ ПРИ ПЕРВОМ ЗАПУСКЕ САЙТА ↓
const firstStart = () => {
	if(dataBase == null || dataBase == ""){
		document.getElementById("emptyDataBase").style.display = "flex";
	}
	else{
		document.getElementById("emptyDataBase").style.display = "none";
		createTable(dataBase);
		//Вывод общей статистики ↓
		commonData();
	}
};

firstStart();

//Получение данных из полей ввода ↓
const onInput = () => {
	name = document.getElementById("name").value;
	surname = document.getElementById("surname").value;
	phone = document.getElementById("phone").value;
	number = document.getElementById("number").value;
	setPrice();
};

//Установка цены ↓
const setPrice = () => {
	const updatedPrice = document.getElementById("price");

	updatedPrice.style.border = "1px solid #fff";
	document.getElementById("all-drink-title").style.color = "#fff";

	for(let i = 0; i < drinkArray.length; i++){
		if(drinkArray[i].checked){
			switch(drinkArray[i].value){
				case "Raspberry latte": 
					updatedPrice.innerHTML = number * "100";
					break;
				case "Kahanamoku": 
					updatedPrice.innerHTML = number * "110";
					break;
				case "Cappuccino": 
					updatedPrice.innerHTML = number * "120";
					break;
				case "Americano": 
					updatedPrice.innerHTML = number * "130";
					break;
				case "Cold bru": 
					updatedPrice.innerHTML = number * "140";
					break;
				case "Ginger": 
					updatedPrice.innerHTML = number * "150";
					break;
				case "Latte": 
					updatedPrice.innerHTML = number * "160";
					break;
				case "Raf": 
					updatedPrice.innerHTML = number * "170";
					break;
				default: 
					updatedPrice.innerHTML = "0";
			}
			break;
		}		
	}
};

//Очистка полей после добавления клиента ↓
const clearInput = () => {
	name = document.getElementById("name").value = "";
	surname = document.getElementById("surname").value = "";
	phone = document.getElementById("phone").value = "";
	number = document.getElementById("number").value = "0";
	price = document.getElementById("price").innerHTML = "0";
	for(let i = 0; i < drinkArray.length; i++){
		if(drinkArray[i].checked){
			drinkArray[i].checked = false;
			break;
		}
	}
};

//Проверка количества напитков ↓
const checkNumber = () => {
	if(number > 0 && number <= 3){
		document.getElementById("max-drink-container").style.display = "none";
		document.getElementById("number").style.border = "1px solid #fff";
		createClient();
	} else {
		document.getElementById("max-drink-container").style.display = "inline";
		number = document.getElementById("number").value = "";
		document.getElementById("number").style.border = "1px solid #ffa500";
	}	
};

//Проверка корректности всех полей ↓
const checkFields = () => {
	if(name == "" || phone == "" || surname == "" || number == ""){
		document.getElementById("emptyFields").style.display = "flex";
		//clearInput();
	} else {
		for(let i = 0; i < drinkArray.length; i++){
			if(drinkArray[i].checked){
				checkNumber();
				break;
			}else{
				document.getElementById("emptyFields").style.display = "flex";
			}
		}
	}
	commonData();
};

//Добавление клиента в базу данных ↓
const createClient = () => {
	const previousDataBase = JSON.parse(localStorage.getItem("Order"));
	
	//Порядковый id
	const clientID = previousDataBase ? previousDataBase.length + 1 : 1;

	const client = {
			id: clientID,
			name: name,
			surname: surname,
			phone: phone,
			Order: {
				drink: document.querySelector('input[name="drink"]:checked').value,
				number: number,
				price: document.getElementById("price").innerHTML
			}
		}
		
	dataBase = previousDataBase ? [...previousDataBase, client] : [client];

	const clientJSON = JSON.stringify(dataBase);
	localStorage.setItem("Order", clientJSON);

	createTable(dataBase);
	document.getElementById("emptyFields").style.display = "none";
	document.getElementById("emptyDataBase").style.display = "none";
	clearInput();
};

//Удаление клиента из базы данных ↓
const removeClient = id => {
	const previousDataBase = JSON.parse(localStorage.getItem("Order"));
	const updateDataBase = previousDataBase.filter(client => client.id != id);

	const newDataBase = JSON.stringify(updateDataBase);
	localStorage.setItem("Order", newDataBase);

	createTable(updateDataBase);
	commonData();
};

//Редактирование полей клиента ↓
const editClient = id => {
	orderBtn.innerHTML = '<button class = "add-order-btn" onclick = "saveChanges(' + id + ')">Save changes</button>';

	const clientFromBD = dataBase.find(client => client.id === id);
	
	document.getElementById("name").value = clientFromBD.name;
	document.getElementById("surname").value = clientFromBD.surname;
	document.getElementById("phone").value = clientFromBD.phone;
	document.getElementById("number").value = clientFromBD.Order.number;
	document.getElementById("price").innerHTML = clientFromBD.Order.price;

	number = clientFromBD.Order.number;
	document.getElementById("number-title").style.color = "#ffa500";
	document.getElementById("all-drink-title").style.color = "#ffa500";
};

//Сохранение изменений ↓
const saveChanges = id => {
	document.getElementById("number-title").style.color = "#fff";
	orderBtn.innerHTML = '<button class = "add-order-btn" id = "addOrder" onclick = "checkFields()">Add order</button>';

	const clientFromBD = dataBase.find(client => client.id === id);
	const client = {
			id: id,
			name: name ? name : clientFromBD.name,
			surname: surname ? surname : clientFromBD.surname,
			phone: phone ? phone : clientFromBD.phone,
			Order: {
				drink: document.querySelector('input[name="drink"]:checked').value ? document.querySelector('input[name="drink"]:checked').value : document.querySelector('input[name="drink"]:checked').value,
				number: number ? number : clientFromBD.Order.number,
				price: document.getElementById("price").innerHTML ? document.getElementById("price").innerHTML : document.getElementById("price").innerHTML
			}
		}

	const clientsDataBase = dataBase.filter(client => client.id != id);
	const updateDataBase = [...clientsDataBase, client];

	const newDataBase = JSON.stringify(updateDataBase);
	localStorage.setItem("Order", newDataBase);

	createTable(updateDataBase);
	clearInput();
};

//Подсчёт количества каждого напитка ↓
const RaspberryLatteDrinkCounter = () => {
	let RaspberryLatteCounter = 0;

	for(let i = 0; i < dataBase.length; i++){
		if(dataBase[i].Order.drink == "Raspberry latte"){
			RaspberryLatteCounter += +(dataBase[i].Order.number);
		}
	}
	return RaspberryLatteCounter;
};
const KahanamokuDrinkCounter = () => {
	let KahanamokuCounter = 0;

	for(let i = 0; i < dataBase.length; i++){
		if(dataBase[i].Order.drink == "Kahanamoku"){
			KahanamokuCounter += +(dataBase[i].Order.number);
		}
	}
	return KahanamokuCounter;
};
const CappuccinoDrinkCounter = () => {
	let CappuccinoCounter = 0;

	for(let i = 0; i < dataBase.length; i++){
		if(dataBase[i].Order.drink == "Cappuccino"){
			CappuccinoCounter += +(dataBase[i].Order.number);
		}
	}
	return CappuccinoCounter;
};
const AmericanoDrinkCounter = () => {
	let AmericanoCounter = 0;

	for(let i = 0; i < dataBase.length; i++){
		if(dataBase[i].Order.drink == "Americano"){
			AmericanoCounter += +(dataBase[i].Order.number);
		}
	}
	return AmericanoCounter;
};
const ColdBruDrinkCounter = () => {
	let ColdBruCounter = 0;

	for(let i = 0; i < dataBase.length; i++){
		if(dataBase[i].Order.drink == "Cold bru"){
			ColdBruCounter += +(dataBase[i].Order.number);
		}
	}
	return ColdBruCounter;
};
const GingerDrinkCounter = () => {
	let GingerCounter = 0;

	for(let i = 0; i < dataBase.length; i++){
		if(dataBase[i].Order.drink == "Ginger"){
			GingerCounter += +(dataBase[i].Order.number);
		}
	}
	return GingerCounter;
};
const LatteDrinkCounter = () => {
	let LatteCounter = 0;

	for(let i = 0; i < dataBase.length; i++){
		if(dataBase[i].Order.drink == "Latte"){
			LatteCounter += +(dataBase[i].Order.number);
		}
	}
	return LatteCounter;
};
const RafDrinkCounter = () => {
	let RafCounter = 0;

	for(let i = 0; i < dataBase.length; i++){
		if(dataBase[i].Order.drink == "Raf"){
			RafCounter += +(dataBase[i].Order.number);
		}
	}
	return RafCounter;
};