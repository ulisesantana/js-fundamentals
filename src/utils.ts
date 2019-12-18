import fs from 'fs';
import path from 'path';

export type Callback = (err: Error | null, data?: any) => void;

export function getApis(cb: Callback): void {
	fs.readFile(path.resolve('src/apis.txt'), {encoding: 'utf8'}, (err, data) => {
		if (err) {
			return cb(err);
		}

		cb(null, JSON.parse(data));
	});
}

export function getApisPromise(): Promise<object> {
	return new Promise((resolve, reject) => {
		fs.readFile(
			path.resolve('src/apis.txt'),
			{encoding: 'utf8'},
			(err, data) => {
				if (err) {
					return reject(err);
				}

				return resolve(JSON.parse(data));
			}
		);
	});
}
