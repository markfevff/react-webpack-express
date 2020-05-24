const app = require('./index');
(async () => {
    app.listen(await app.create());
})();
