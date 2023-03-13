// Axios is mocked to not make real requests in tests
// and to return predictable data every time.

export default {
    get: jest.fn().mockResolvedValue({}),
};