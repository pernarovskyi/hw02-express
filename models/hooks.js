const validateWhenUpdate = function(next){
    this.options.runValidators = true;
    next();
};

const handleSaveError = (error, data, next) => {
    error.status = 400;
    next();
};

module.exports = {
    validateWhenUpdate,
    handleSaveError,
}