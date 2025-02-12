const GREETING = 'Hello world!';

module.exports = async (req, res) => {
    debugger;
    res.send({
        greeting: GREETING,
    });
};
