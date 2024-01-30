const http = require('https');
// Gets the username from a Roblox ID via Roblox official API endpoints.
async function err(interaction, error) {
	if (interaction !== undefined) {
		await interaction.followUp({ content: `There was an error while executing this command!\n*You may be able to ignore it...*\n\nIf issues persist, kindly contact <@744076526831534091>. \nError:\n${error}`});
	}
	console.log(error);
};

exports.getGroups = async function(robloxId) {
	const options = {
		hostname: 'groups.roblox.com',
		method: 'GET',
		path: `/v2/users/${robloxId}/groups/roles`,
		protocol: 'https:',
		includeLocked: "true",
		headers: {
			'accept': 'text/json',
			'Content-Type': 'application/json',
		},
	};
	const id = new Promise((resolve, reject) => {
		const req = http.get(options, res => {
			console.log('Roblox GET request started by getGroups function!');
			console.log(`STATUS: ${res.statusCode}`);
			console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
			res.setEncoding('utf8');
			const data = [];
			res.on('data', (chunk) => {
				data.push(chunk);
			});
			res.on('end', () => {
				let resBody;
				try {
					resBody = JSON.parse(data);
					switch (res.headers['content-type']) {
					case 'text/json':
						resBody = JSON.parse(resBody);
						break;
					}
					resolve(resBody);
				} catch (error) {
					err(undefined, error)
				}
			});
		});
		req.on('error', reject);
		req.end();
	});

	return id;
};

exports.getUserInfoFromId = async function(robloxId) {
	const options = {
		hostname: 'users.roblox.com',
		method: 'GET',
		path: `/v1/users/${robloxId}`,
		protocol: 'https:',
		headers: {
			'accept': 'text/json',
			'Content-Type': 'application/json',
		},
	};
	const id = new Promise((resolve, reject) => {
		const req = http.get(options, res => {
			console.log('Roblox GET request started by getGroups function!');
			console.log(`STATUS: ${res.statusCode}`);
			console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
			res.setEncoding('utf8');
			const data = [];
			res.on('data', (chunk) => {
				data.push(chunk);
			});
			res.on('end', () => {
				let resBody;
				try {
					resBody = JSON.parse(data);
					switch (res.headers['content-type']) {
					case 'text/json':
						resBody = JSON.parse(resBody);
						break;
					}
					resolve(resBody);
				}
				catch(error) {
					err(undefined, error)
				}
			});
		});
		req.on('error', reject);
		req.end();
	});

	return id;
};

// get the ID of multiple roblox users from their usernames.
exports.robloxUsertoID = async function(robloxUserTable) {
	const postData = JSON.stringify({
		'usernames': robloxUserTable,
		'excludeBannedUsers': false,
	});
	const options = {
		hostname: 'users.roblox.com',
		method: 'POST',
		path: '/v1/usernames/users',
		protocol: 'https:',
		headers: {
			'accept': 'text/json',
			'Content-Type': 'application/json',
		},
	};
	const id = new Promise((resolve, reject) => {
		const req = http.request(options, res => {
			console.log('Roblox POST request started by robloxUsertoID function!');
			console.log(`STATUS: ${res.statusCode}`);
			console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
			res.setEncoding('utf8');
			const data = [];
			res.on('data', (chunk) => {
				data.push(chunk);
			});
			res.on('end', () => {
				let resBody = JSON.parse(data);
				switch (res.headers['content-type']) {
				case 'text/json':
					resBody = JSON.parse(resBody);
					break;
				}
				resolve(resBody);
			});
		});
		req.on('error', reject);
		req.write(postData);
		req.end();
	});

	return id;
};

// helper function: get the current date
exports.getDate = async function() {
	const today = new Date();
	const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
	const dateTime = date + ' ' + time;
	return dateTime;
};

// helper function: error the command
exports.err = async function(interaction, error) {
	if (interaction !== undefined) {
		await interaction.followUp({ content: `There was an error while executing this command!\n*You may be able to ignore it...*\n\nIf issues persist, kindly contact <@744076526831534091>. \nError:\n${error}`});
	}
	console.log(error);
};