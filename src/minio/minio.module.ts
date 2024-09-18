import { Global, Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import * as Minio from 'minio';

@Global()
@Module({
  providers: [
    {
      provide: 'MINIO_CLIENT',
      async useFactory() {
        const client = new Minio.Client({
          endPoint: 'localhost',
          port: 9000,
          useSSL: false,
          accessKey: 'UWJdAjInuekfDV5UlWmO',
          secretKey: '1FgebD0Ot3iNKJvFt4ZY0DGgyBZ7dhBHCnshCIUb',
        });
        return client;
      },
    },
    MinioService,
  ],
  exports: ['MINIO_CLIENT', MinioService],
})
export class MinioModule {}
