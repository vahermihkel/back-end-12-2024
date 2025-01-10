import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "nav": {
        "add-product": "Add product",
        "manage-products": "Manage products",
        "manage-categories": "Manage categories",
      },
      "product": {
        "name": "Name",
        "price": "Price",
        "category": "Category",
        "stock": "Stock",
        "active": "Active",
        "nutrients": "Nutrients",
      },
      "table": {
        "actions": "Actions"
      }
    }
  },
  et: {
    translation: {
      "nav": {
        "add-product": "Lisa toode",
        "manage-products": "Halda tooteid",
        "manage-categories": "Halda kategooriaid",
      },
      "product": {
        "name": "Nimi",
        "price": "Hind",
        "category": "Kategooria",
        "stock": "Laokogus",
        "active": "Aktiivne",
        "nutrients": "Toitained",
      },
      "table": {
        "actions": "Tegevused"
      }
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("language") || "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;