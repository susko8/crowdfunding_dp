module.exports = {

    test_directory: 'test/solidity',
    networks: {
        ganache: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*',
            gas: 6721975
        },
        test: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*',
            gas: 6721975
        }
    }
}
