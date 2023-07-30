const validateWhenUpdate = function(next){
    this.options.runValidators = true;
    next();
};

const handleSaveError = (error, data, next) => {
    const { code, name } = error;

    error.status = (code === 11000 && name === "MongoServerError") ? 409 : 400;
    next();
};

module.exports = {
    validateWhenUpdate,
    handleSaveError,
}