import {getApis} from '../utils';

function runWithCallback(): void {
	console.log('A punto de pedir las APIS');

	getApis((err: Error | null, data?: object) => {
		if (err) {
			console.error('Algo fue mal:', err.toString());
			throw err;
		}

		if (typeof data === 'object') {
			console.log(
				'Hemos recibido información de',
				Object.values(data).length,
				'apis'
			);

			return;
		}

		console.log('Algo que no contemplamos ha pasado');
	});

	console.log('Hemos terminado de procesar las apis.');
}


console.log('Callback way');
runWithCallback();

