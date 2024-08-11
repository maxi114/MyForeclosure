import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from './es/common.json';
import fr from './fr/common.json';

export const Languages = {
	EN: 'en',
	ES: 'es',
	FR: 'fr'
};

export const isValidLanguage = (lang) => Object.values(Languages).includes(lang);

i18n.use(initReactI18next).init({
	lng: Languages.EN,
	resources: {
		[Languages.ES]: { translation: es },
		[Languages.FR]: {translation: fr }
	},
});

export default i18n;
