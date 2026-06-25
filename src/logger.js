const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzIxMWE3MjgyQGJ2cml0LmFjLmluIiwiZXhwIjoxNzgyMzc3NTc0LCJpYXQiOjE3ODIzNzY2NzQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJmMTg5NWYzOC05NDc2LTQ0NDctODI5Yy01ZDAzZmE1MThkOGIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhYmhpc2hlayByYXRob2QgbiIsInN1YiI6Ijg4NWVmMjJhLWRhMTUtNDNiMC1hN2YxLThmMDdhZmZmYjQxMyJ9LCJlbWFpbCI6IjIzMjExYTcyODJAYnZyaXQuYWMuaW4iLCJuYW1lIjoiYWJoaXNoZWsgcmF0aG9kIG4iLCJyb2xsTm8iOiIyMzIxMWE3MjgyIiwiYWNjZXNzQ29kZSI6ImFoWGp2cCIsImNsaWVudElEIjoiODg1ZWYyMmEtZGExNS00M2IwLWE3ZjEtOGYwN2FmZmZiNDEzIiwiY2xpZW50U2VjcmV0IjoidHR3UVJQWHZDZ210Sll0VyJ9.IWpEPrnF74TszivMkYFVYME7pRXqMQ6BRUnFOVdqvVM";

async function Log(stack, level, packageName, message) {
  try {
    const response = await fetch("http://localhost:4000/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: packageName,
        message: message
      })
    });
    const data = await response.json();
    console.log("Log created:", data);
  } catch (error) {
    console.error("Logging failed:", error);
  }
}

export default Log;