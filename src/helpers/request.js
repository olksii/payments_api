function makeRequest(method, url) {
	const xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.send();

	xhr.onload = function () {
		if (xhr.status != 200) {
			return (`Ошибка ${xhr.status}: ${xhr.statusText}`);
		}

		return (`${xhr.response}`);
	};

	xhr.onerror = function (err) {
		return (err);
	};
}

module.exports = makeRequest;
