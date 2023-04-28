import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mysql from 'mysql2';
import { encode } from './short-url';

// Types
import type { OkPacket, RowDataPacket } from 'mysql2';

// 配置
dotenv.config();

// 应用
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 数据库
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// 将长链变短链
app.post('/shorten', (req, res) => {
    // 长链接
    const url = req.body.url;

    connection.query<RowDataPacket[]>('SELECT hash FROM urls WHERE `url` = ?', [url], (error, results) => {
        if (error) throw error;

        // 已有域名直接返回短链接
        if (results.length) {
            res.json({
                code: 0,
                data: results[0].hash,
            });
            return;
        }

        connection.query<RowDataPacket[]>('SELECT COUNT(id) as count FROM urls', (error, results) => {
            if (error) throw error;

            // 短链接
            const hash = encode(results.length ? results[0].count : 0);

            connection.query<OkPacket>('INSERT INTO urls SET ?', { url, hash }, (error, results) => {
                if (error) throw error;

                res.json({
                    code: 0,
                    data: hash,
                });
            });
        });
    });
});

// 将短链变长链
app.get('/:hash', (req, res) => {
    // 短链接
    const hash = req.params.hash;

    connection.query<RowDataPacket[]>('SELECT url FROM urls WHERE hash = ?', [hash], (error, results) => {
        if (error) throw error;

        // 已有短链接直接跳转域名
        if (results.length) {
            res.redirect(results[0].url);
            return;
        }

        res.json({
            code: 404,
            message: 'Not Found',
        });
    });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));

export default app;
