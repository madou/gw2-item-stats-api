const { bulkRead } = require("..");

exports.handler = async event => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        "content-type": "application/json; charset=utf-8",
        "Access-Control-Max-Age": "1728000" // 20 days
      }
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const params = JSON.parse(event.body);
  const { lang } = event.queryStringParameters || {};
  const result = await bulkRead(params, lang);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Max-Age": "1728000", // 20 days
      "cache-control": "public,max-age=604800", // 7 days cache
      "content-type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(result)
  };
};
