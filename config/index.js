const { env } = process;
module.exports = {
    PORT: env.PORT,
    HMR: env.HMR === 'true',
}