const Mercury = require("@postlight/mercury-parser");

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  console.log(event);
  console.log(event.queryStringParameters);

  const url = event.queryStringParameters.url;

  if (!url) {
    return {
      statusCode: 400,
      body:
        "Invalid request. URL paramter is required, i.e. `?url=http://www...`",
    };
  }

  try {
    const result = await Mercury.parse(url);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      // // more keys you can return:
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Content-Type": "application/json",
      // },
      // isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};