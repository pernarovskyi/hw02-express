const userEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const subscription = Object.freeze({
    STARTER: "starter",
    PRO: "pro",
    BUSINESS: "business"
});


module.exports = {
    userEmailRegex,
    subscription,
}