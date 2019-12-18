function second(): void {
	console.log('Hola desde la segunda función');
}

function first(): void {
	console.log('Comenzamos!');
	second();
	console.log('El dulce final');
}

first();
