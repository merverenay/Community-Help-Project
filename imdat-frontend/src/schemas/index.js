import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const loginSchema = yup.object().shape({
    email: yup.string()
    .email('Geçerli bir email giriniz')
    .required('Email girmek zorunludur'),

    password:yup.string()
    .min(5, 'Lütfen minimum 5 karakter giriniz')
    .matches(passwordRules,{
         message: 'Lütfen en az bir büyük harf bir küçük harf ve bir sayı giriniz'
  }).required('Şifre girmek zorunludur')

})