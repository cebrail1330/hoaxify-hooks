import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import React from "react";
import {register} from "timeago.js";

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
                'Load Failure': 'Load Failure',
                'User not Found': 'User not Found',
                Edit: 'Edit',
                Save: 'Save',
                Cancel: 'Cancel',
                "Change Display Name": "Change Display Name",
                'My Profile':'My Profile',
                'There are no hoaxes': 'There are no hoaxes',
                'Load old hoaxes': 'Load old hoaxes',
                'There are new hoaxes':'There are new hoaxes',
                'Delete Hoax':'Delete Hoax',
                'Are you sure to delete hoax?':'Are you sure to delete hoax?',
                'Are you sure to delete your account?':'Are you sure to delete your account?',
                'Delete My Account':'Delete My Account'
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
                'Load Failure': 'Liste alınamadı',
                'User not Found': 'Kullanıcı bulunamadı',
                Edit: 'Düzenle',
                Save: 'Kaydet',
                Cancel: 'iptal et',
                "Change Display Name": "Görünür isminizi değiştirin",
                'My Profile':"Hesabım",
                'There are no hoaxes': 'Hoax bulunamadı',
                'Load old hoaxes':'Geçmiş Hooaxları getir',
                'There are new hoaxes': 'Yeni Hoaxlar var',
                'Delete Hoax': `Hoax'u Sil`,
                'Are you sure to delete hoax?':`Hoax'u silmek istediğinizden emin misiniiz?`,
                'Are you sure to delete your account?':'Hesabınızı silmek istediğinizden emin misiniz?',
                'Delete My Account':'Hesabımı Sil'
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
const timeageTR =( number, index)=> {
    return [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde'],
    ][index];
}
register('tr', timeageTR)
export default i18n;

