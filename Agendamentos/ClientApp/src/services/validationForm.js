export const validateName = (name) => {
    const minLength = 2;
    const maxLength = 15;
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