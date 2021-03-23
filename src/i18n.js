import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources:{
        en:{
            translations:{
                'Sign Up':'Sign Up',
                'Password mismatch':'Password mismatch',
                'Username': 'Username',
                'Display Name': 'Display Name',
                'Password':'Password',
                'PasswordRepeat':'PasswordRepeat',
                Login:'Login',
                Logout:'Logout',
                Users: 'Users',
                Next: 'next >',
                Previous :'< previous',
                'Load Failure': 'Load Failure'
            }
        },
        tr:{
            translations:{
                'Sign Up':'Kayıt Ol',
                'Password mismatch': 'Aynı şifreyi giriniz',
                'Username': 'Kullanıcı Adı',
                'Display Name': 'Tercih edilen isim',
                'Password':'Şifre',
                'Password Repeat':'Şifre tekrarla',
                Login:'Sisteme Gir',
                Logout:'Çık',
                Users: 'Kullanıcılar',
                Next: 'sonraki >',
                Previous :'< önceki',
                'Load Failure': 'Liste alınamadı'
            }

        }
    },
    fallbackLng:'en',
    ns:['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation:{
        escapeValue:false,
        formatSeparator:','
    },
    react: {
        wait: true
    }
});

export default i18n;

