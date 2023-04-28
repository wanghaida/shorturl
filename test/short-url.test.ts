import { encode, decode } from '../src/short-url';

describe('将数字转成短字符串', () => {
    test('12 -> g', async () => {
        expect(encode(12)).toEqual('g');
    });

    test('12345678 -> 3S5y8', async () => {
        expect(encode(12345678)).toEqual('3S5y8');
    });
});

describe('将短字符串转成数字', () => {
    test('g -> 12', async () => {
        expect(decode('g')).toEqual(12);
    });

    test('3S5y8 -> 12345678', async () => {
        expect(decode('3S5y8')).toEqual(12345678);
    });
});