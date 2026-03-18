const delay = async (ms) => new Promise((r) => setTimeout(r, ms));

const retry = async (
    fn,
    retriesLeft = 3,
    interval = 500,
    exponential = false,
) => {
    try {
        const val = await fn();
        return val
    } catch (error) {
        if (retriesLeft) {
            await delay(interval);

            return retry(
                fn,
                retriesLeft - 1,
                exponential ? interval * 2 : interval,
                exponential,
            );
        }

        throw new Error(`Max retries reached for function ${fn.name}`);
    }
}

module.exports = {
    retry
}
