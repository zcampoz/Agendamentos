export const validateName = (name) => {
    const minLength = 2;
    const maxLength = 50;
    return (name.length >= minLength && name.length <= maxLength);
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    const minLength = 8;
    const maxLength = 30;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
        password.length >= minLength &&
        password.length <= maxLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasDigit &&
        hasSpecialChar
    );
};

export const validatePasswordMaxLength = (password) => {
    const minLength = 8;
    return password.length >= minLength
}

export const validatePasswordMinLength = (password) => {
    const maxLength = 30;
    return password.length <= maxLength;
}

export const validatePasswordUpperCase = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    return hasUpperCase
}

export const validatePasswordLowerCase = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    return hasLowerCase;
}

export const validatePasswordHasDigit = (password) => {
    const hasDigit = /\d/.test(password);
    return hasDigit;
}

export const validatePasswordHasSpecialChar = (password) => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasSpecialChar;
}

export const validateTime = (time) => {
    const minutes = time.split(':').map(Number)[1];
    return (minutes % 10 === 0) 
};

export const validateTimeDifference = (initial, final) => {
    const [hoursInitial, minutesInitial] = initial.split(':').map(Number);
    const [hoursFinal, minutesFinal] = final.split(':').map(Number);

    return hoursInitial < hoursFinal || (hoursInitial === hoursFinal && minutesInitial < minutesFinal);
};

export const validateServiceName = (name) => {
    const minLength = 2;
    const maxLength = 100;
    return (name.length >= minLength && name.length <= maxLength);
};

export const validateDescricao = (description) => {
    const minLength = 2;
    const maxLength = 300;
    return (description.length >= minLength && description.length <= maxLength);
};

export const validatePreco = (value) => {
    return parseInt(value, 10) > 0;
};

export const validateDuracao = (duration) => {
    let minutes = parseInt(duration, 10)
    return (minutes > 0) && (minutes % 10 === 0);
};