export const FNAME_LNAME_REGEX: RegExp = /^[A-Za-z]{0,25}$/;
export const MOBILE_REGEX: RegExp = /^[0-9]{10}$/;
export const EMAIL_REGEX: RegExp = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export const PASSWORD_REGEX: RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,}$/;
export const NAME_REGEX: RegExp = /^[a-zA-Z ]*$/;
