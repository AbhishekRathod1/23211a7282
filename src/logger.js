async function Log(stack, level, packageName, message) {
  try {
    if (typeof fetch !== "function") {
      return;
    }

    const apiBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";
    const response = await fetch(apiBaseUrl + "/logs", {
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

    if (!response.ok) {
      return;
    }
  } catch (error) {
    return;
  }
}

export default Log;
