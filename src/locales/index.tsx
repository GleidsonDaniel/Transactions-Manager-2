import lodashResult from 'lodash/result';
import {getLocales} from 'react-native-localize';

import en from './english';
import pt from './brazilianPortuguese';

const availableLanguages = {
  en: en,
  pt: pt,
};

export const translate = (path: string) => {
  const selectedLanguage = 'pt';
  const locale = getLocales()[0];
  const selectedLanguageObject = selectedLanguage
    ? availableLanguages[selectedLanguage]
    : availableLanguages[locale.languageCode];
  const phrase: string = lodashResult(selectedLanguageObject, path);
  return phrase || '';
};
