import { lookup } from 'dns';
import * as https from "https";
import * as http from "http";
import { SerializedSkin } from 'bdsx/bds/skin';
import { ImageScript } from './ImageScript';


export function parseDuration(input: string): number {
	const components = input.split(/\s*,\s*/);
	let totalMillis = 0;

	for (const component of components) {
		const [value, unit] = component.split(/\s+/);
		const numericValue = parseInt(value, 10);

		if (!isNaN(numericValue)) {
			switch (unit) {
				case "year":
				case "years":
				case "y":
					totalMillis += numericValue * 365 * 24 * 60 * 60 * 1000;
					break;
				case "month":
				case "months":
				case "mo":
					totalMillis += numericValue * 30 * 24 * 60 * 60 * 1000;
					break;
				case "week":
				case "weeks":
				case "w":
					totalMillis += numericValue * 7 * 24 * 60 * 60 * 1000;
					break;
				case "day":
				case "days":
				case "d":
					totalMillis += numericValue * 24 * 60 * 60 * 1000;
					break;
				case "hour":
				case "hours":
				case "h":
					totalMillis += numericValue * 60 * 60 * 1000;
					break;
				case "minute":
				case "minutes":
				case "min":
				case "s":
					totalMillis += numericValue * 60 * 1000;
					break;
				case "second":
				case "seconds":
				case "sec":
					totalMillis += numericValue * 1000;
					break;
				default:
					throw `Invalid unit: ${unit}`;
			}
		} else {
			throw `Invalid numeric value: ${value}`;
		}
	}

	return totalMillis;
}

export namespace WebUtils {
	export interface Response {
		code: number
		body: string
	}

	function followRedirect(originalUrl: string, res: http.IncomingMessage, method: string, body: string | null, headers: {[k: string]: string}, resolve: (response: Response) => void, reject: (error: any) => void) {
		const location = res.headers.location;
		if (!location) {
			reject(new Error("Redirect location not found"));
			return;
		}
		const newUrl = new URL(location, originalUrl).toString();
		if (method === 'GET') {
			get(newUrl, headers).then(resolve).catch(reject);
		} else if (method === 'POST') {
			post(newUrl, JSON.parse(body ?? '{}'), headers).then(resolve).catch(reject);
		}
	}

	export function get(url: string, headers: {[k: string]: string} = {}): Promise<Response> {
		return new Promise<Response>(async (resolve, reject) => {
			https
				.request(url, (res) => {
					let data = "";
					res
						.on("data", ch => data += ch)
						.on("error", reject)
						.on("close", () => {
							if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400) {
								followRedirect(url, res, 'GET', null, headers, resolve, reject);
							} else {
								resolve({
									body: data,
									code: res.statusCode ?? 404
								});
							}
						})
					;
				})
				.end()
			;
		});
	}
	
	export function post(url: string, body: {[k: string]: any} = {}, headers: {[k: string]: string} = {}): Promise<Response>{
		return new Promise<Response>(async (resolve, reject) => {
			https
				.request(url, {method: "post"}, (res) => {
					let data = "";
					res
						.on("data", ch => data += ch)
						.on("error", reject)
						.on("close", () => {
							if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400) {
								followRedirect(url, res, 'POST', null, headers, resolve, reject);
							} else {
								resolve({
									body: data,
									code: res.statusCode ?? 404
								});
							}
						})
					;
				})
				.end()
			;
		});
	}

	export function isFromSameHost(ip: string): Promise<boolean> {
		return new Promise((resolve) => {
			lookup(ip, { all: true }, (err, addresses) => {
				if (err) {
					resolve(false);
					return;
				}
				const address = addresses[0].address;
				const isLocalAddress =
					address === '127.0.0.1' || // loopback
					address === '::1' || // IPv6 loopback
					address.startsWith('192.168.') || // private IPv4 range
					address.startsWith('10.') || // private IPv4 range
					address.startsWith('172.') && (Number(address.split('.')[1]) >= 16 && Number(address.split('.')[1]) <= 31) // private IPv4 range
				;
				resolve(isLocalAddress);
			});
		});
	}
}

export namespace SkinUtils {
	export function convertSkinToBase64File(skin: SerializedSkin): Promise<string | null> {
        return new Promise(async (resolve, reject) => {
			if (skin.isPersona) {
                resolve(null);
                return;
            }
            const image = fromSkinToImage(skin);
            if (!image) {
                resolve(null);
                return;
            }
			const encoded = await image.encode();
			resolve(Buffer.from(encoded).toString('base64'));
        });
    }

    function fromSkinToImage(skin: SerializedSkin): ImageScript.Image {
        const skinData = skin.skinImage.blob;
        let width: number, height: number;

        switch (skinData.size) {
            case 8192: {
                width = 64;
                height = 32;
                break;
            }
            case 16384: {
                width = 64;
                height = 64;
                break;
            }
            case 32768: {
                width = 128;
                height = 64;
                break;
            }
            case 65536: {
                width = 128;
                height = 128;
                break;
            }
            default: {
                throw new Error('Invalid skin data length');
            }
        }
		const image = new ImageScript.Image(width, height);
		image.bitmap.set(skinData.toArray());
		return image;
    }
}
