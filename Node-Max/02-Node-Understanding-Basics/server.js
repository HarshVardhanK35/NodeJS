const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // parsing URL and method:
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter a message</title></head>");
    res.write(
      `<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>`
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(parsedBody);
      fs.writeFile("message.txt", message, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
//   res.setHeader("Content-Type", "text/html");
//   res.write("<html>");
//   res.write("<head><title>My first node page</title></head>");
//   res.write("<body><h1>Hello world!</h1></body>");
//   res.write("</html>");
//   res.end();
});

server.listen(8080);
