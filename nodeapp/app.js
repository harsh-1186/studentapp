const http = require('http');
const fs = require('fs').promises;
const PORT = 3005;

const server = http.createServer(async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === "OPTIONS") {
        res.statusCode = 200;
        return res.end();
    }

    try {
        // Ensure the file exists before reading or writing
        try {
            await fs.access('student.json');
        } catch {
            await fs.writeFile('student.json', JSON.stringify([]));  // Create an empty file if not exists
        }

        if (req.url === "/register" && req.method === "POST") {
            let body = '';
            req.on('data', chunk => body += chunk);

            req.on('end', async () => {
                try {
                    const { name, email, password } = JSON.parse(body);
                    const data1 = await fs.readFile('student.json', { encoding: 'utf-8' });
                    const arr = JSON.parse(data1);

                    const result = arr.find(ele => ele.email === email);
                    if (result) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ msg: "Email is already registered" }));
                    } else {
                        arr.push({ name, email, password });
                        await fs.writeFile('student.json', JSON.stringify(arr, null, 2)); // ✅ Async Write
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ msg: "User successfully registered" }));
                    }
                } catch (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ msg: `Error: ${err.message}` }));
                }
            });
        }

        else if (req.url === "/login" && req.method === "POST") {
            let body = '';
            req.on('data', chunk => body += chunk);

            req.on('end', async () => {
                try {
                    const { email, password } = JSON.parse(body);
                    const data1 = await fs.readFile('student.json', { encoding: 'utf-8' });
                    const arr = JSON.parse(data1);

                    const result = arr.find(ele => ele.email === email && ele.password === password);
                    if (result) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ msg: "success" }));
                    } else {
                        res.writeHead(401, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ msg: "User is invalid" }));
                    }
                } catch (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ msg: `Error: ${err.message}` }));
                }
            });
        }

        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ msg: "Route Not Found" }));
        }

    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ msg: `Server Error: ${err.message}` }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
