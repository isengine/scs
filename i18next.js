import dotenv from 'dotenv'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import i18nextMiddleware from 'i18next-http-middleware'
import registerI18nHelper from 'handlebars-i18next'
import hbs from 'hbs'

dotenv.config()

const lang = process.env.LANG
let langs
try {
  langs = JSON.parse(process.env.LANGS) ?? [lang]
} catch (e) {
  langs = [lang]
}

const langFile = process.env.LANG_FILE
let langFiles
try {
  langFiles = JSON.parse(process.env.LANG_FILES) ?? [langFile]
} catch (e) {
  langFiles = [langFile]
}

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      backend: {
        loadPath: './i18n/{{lng}}/{{ns}}.json'
      },
      ns: langFiles,
      defaultNS: langFile,
      debug: false,
      detection: {
        caches: ['cookie'],
        cookieSameSite: 'strict',
        lookupQuerystring: 'lang',
        lookupCookie: 'i18next',
        order: ['querystring', 'cookie', 'header']
      },
      saveMissing: true,
      fallbackLng: lang,
      preload: langs
    },
    (err) => {
      if (err) return console.error(err)
      console.log('i18next is ready')
    }
  );

registerI18nHelper.default(hbs, i18next, 'lang')

export default i18next
