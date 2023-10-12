import { APIGatewayProxyHandler } from 'aws-lambda';

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
};

export const handler: APIGatewayProxyHandler = async event => {

  console.log("DemoAPI Called");

  const body = { "stats": [randomInt(0, 30), randomInt(0, 30), randomInt(0, 30), randomInt(0, 30), randomInt(0, 30), randomInt(0, 30), randomInt(0, 30), randomInt(0, 30)] };

  // send back our whole http resoponse
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  }

}