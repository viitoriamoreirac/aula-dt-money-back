import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('TransactionController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/transaction (GET)', () => {
    it('should return paginated transactions', () => {
      return request(app.getHttpServer())
        .get('/transaction?skip=0&take=10')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('transactions');
          expect(res.body).toHaveProperty('totalCount');
          expect(Array.isArray(res.body.transactions)).toBe(true);
          expect(typeof res.body.totalCount).toBe('number');
        });
    });

    it('should validate pagination parameters', () => {
      return request(app.getHttpServer())
        .get('/transaction?skip=-1&take=0')
        .expect(400);
    });
  });

  describe('/transaction (POST)', () => {
    it('should create a transaction', () => {
      const transactionData = {
        title: 'Test Transaction',
        category: 'Test Category',
        data: '2024-01-01T00:00:00.000Z',
        price: 100,
        type: 'OUTCOME',
      };

      return request(app.getHttpServer())
        .post('/transaction')
        .send(transactionData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toBe(transactionData.title);
          expect(res.body.category).toBe(transactionData.category);
          expect(res.body.price).toBe(transactionData.price);
          expect(res.body.type).toBe(transactionData.type);
        });
    });

    it('should validate required fields', () => {
      const invalidData = {
        title: 'Test',
        price: 'invalid',
      };

      return request(app.getHttpServer())
        .post('/transaction')
        .send(invalidData)
        .expect(400);
    });
  });

  describe('/transaction/:id (GET)', () => {
    it('should return 404 for non-existent transaction', () => {
      return request(app.getHttpServer())
        .get('/transaction/non-existent-id')
        .expect(404);
    });
  });

  describe('/transaction/:id (PATCH)', () => {
    it('should return 404 for non-existent transaction', () => {
      return request(app.getHttpServer())
        .patch('/transaction/non-existent-id')
        .send({ title: 'Updated Title' })
        .expect(404);
    });
  });

  describe('/transaction/:id (DELETE)', () => {
    it('should return 404 for non-existent transaction', () => {
      return request(app.getHttpServer())
        .delete('/transaction/non-existent-id')
        .expect(404);
    });
  });
}); 