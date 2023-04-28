const axios = require('axios');

describe('API Test Suite', () => {
    test('生成短链接', async () => {
        const response = await axios.post('http://localhost:3000/shorten', {
            url: 'https://baidu.com/',
        });

        expect(response.status).toBe(200);
        expect(response.data.code).toBe(0);
        expect(typeof response.data.data).toBe('string');
    });

    test('获取长链接', async () => {
        const response = await axios.get('http://localhost:3000/A2C4');

        expect(response.status).toBe(200);
        expect(response.data.code).toBe(404);
        expect(response.data.message).toBe('Not Found');
    });
});
