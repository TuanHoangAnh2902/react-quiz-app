// return a promise that resolves with a File instance
async function UrlToFile(url, filename, mimeType) {
	if (url.startsWith('data:')) {
		var arr = url.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[arr.length - 1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		var file = new File([u8arr], filename, { type: mime || mimeType });
		return Promise.resolve(file);
	}
	const res = await fetch(url);
	const buf = await res.arrayBuffer();
	return new File([buf], filename, { type: mimeType });
}
export default UrlToFile;
