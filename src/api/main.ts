// import { NestFactory } from '@nestjs/core';
// import { AppModule } from '../src/app.module';

// async function bootstrap() {
//   const port = process.env.PORT || 3000;
//   const app = await NestFactory.create(AppModule);
//   app.setGlobalPrefix('api');
//   app.enableCors();
//   await app.listen(port);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from '../app.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

// import type { VercelRequest, VercelResponse } from '@vercel/node';

// export default function handler(
//   request: VercelRequest,
//   response: VercelResponse,
// ) {
//   response.status(200).json({
//     body: request.body,
//     query: request.query,
//     cookies: request.cookies,
//   });
// }
