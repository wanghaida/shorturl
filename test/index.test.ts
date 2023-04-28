import * as request from 'supertest';
import app from '../src/index';

const testUrl1 = 'https://www.google.com';
const testUrl2 = 'https://www.baidu.com';

describe('生成短链接', () => {
    test('POST /shorten 应该生成短链接', async () => {
        const res1 = await request(app).post('/shorten').send({ url: testUrl1 });
        const res2 = await request(app).post('/shorten').send({ url: testUrl2 });

        expect(res2.statusCode).toEqual(200);
        expect(res2.body.code).toEqual(0);
        expect(typeof res2.body.data).toBe('string');
    });

    test('POST /shorten 同一长链接应该生成相同的短链接', async () => {
        const res1 = await request(app).post('/shorten').send({ url: testUrl1 });
        const res2 = await request(app).post('/shorten').send({ url: testUrl1 });

        expect(res1.body.data).toEqual(res2.body.data);
    });
});

describe('获取长链接', () => {
    test('GET /:hash 应该重定向到长链接', async () => {
        const res1 = await request(app).post('/shorten').send({ url: testUrl1 });
        const res2 = await request(app).get(`/${res1.body.data}`);

        expect(res2.statusCode).toEqual(302);
        expect(res2.header.location).toEqual(testUrl1);
    });

    test('GET /:hash 不存在的短链接应该返回 404', async () => {
        const res = await request(app).get('/non-existent-hash');

        expect(res.statusCode).toEqual(200);
        expect(res.body.code).toEqual(404);
        expect(res.body.message).toEqual('Not Found');
    });
});
