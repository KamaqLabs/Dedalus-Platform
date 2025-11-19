import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NotAcceptableException, ValidationError, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        stopAtFirstError: true,
        errorHttpStatusCode: 406,
        exceptionFactory: (errors: ValidationError[]) => {
            console.log('Validation errors:', errors);
            const messages = errors.flatMap(error =>
                error.constraints ? Object.values(error.constraints) : []
            );
            console.log('extracted messages:', messages);
            return new NotAcceptableException(messages);
        },
    }));

    const config = new DocumentBuilder()
        .setTitle('Dedalus Platform API')
        .setDescription('Dedalus Platform API documentation')
        .setVersion('1.0')
        .addSecurity('bearer', {
            type: 'http',
            scheme: 'bearer',
        })
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);


    const cors = require('cors');
    const allowedOrigin = process.env.WEB_APP_URL;

    app.use(cors({
        origin: '*',
        credentials: true
    }));
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
    console.log(`App listening on ${process.env.PORT ?? 3000}`);
}

bootstrap();
