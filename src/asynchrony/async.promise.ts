import {getApisPromise} from '../utils';

async function runAsync(): Promise<void> {
	console.log('A punto de pedir las APIS');
	try {
		const data = await getApisPromise();

		if (typeof data === 'object') {
			console.log(
				'Hemos recibido un total de',
				Object.values(data).length,
				'apis'
			);

			return;
		}
	} catch (error) {
		console.error('Algo fue mal:', error.toString());
		throw error;
	} finally {
		console.log('Hemos terminado con las apis.');
	}
}