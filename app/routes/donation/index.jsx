import ISOCountries from "i18n-iso-countries";
import Input from "app/components/Input";
import { Select, links } from "app/components/Selects";
import { Form, useActionData, useFetcher, useLoaderData } from "remix";
import { getClientLocales } from "remix-utils";
import { capture } from "app/services/sentry";

export const loader = ({ request }) => {
  capture("locales", { extra: { locales: getClientLocales(request) } });
  console.log(getClientLocales(request));
  const twoLettersLocales = getClientLocales(request)?.filter((l) => !l.includes("-"));
  let locale = twoLettersLocales?.[0] || "en"; // filter all 'en-US' and stuff like that
  if (!ISOCountries.getSupportedLanguages().includes(locale)) locale = "en";
  const countries = ISOCountries.getNames(locale, { select: "official" });
  const arrayOfCountriesForSelect = Object.entries(countries).map(([value, label]) => ({
    value,
    label,
  }));
  return {
    countries: arrayOfCountriesForSelect,
    currencies: [
      { value: "eur", label: "€ Euro" },
      { value: "dollar", label: "$ Dollar" },
    ],
  };
};

const Donation = () => {
  const { countries, currencies } = useLoaderData();
  const fetcher = useFetcher();

  console.log({ fetcher });
  return (
    <fetcher.Form
      id="donation"
      method="POST"
      action="/actions/fintecture/payment-request"
    >
      <Input
        type="text"
        name="firstName"
        id="donation-firstName"
        label="Prénom"
        placeholder="Votre prénom"
        required
        autoComplete="given-name"
      />
      <Input
        type="text"
        name="lastName"
        id="donation-lastName"
        label="Nom"
        placeholder="Votre nom"
        required
        autoComplete="family-name"
      />
      <Input
        type="email"
        name="email"
        id="donation-email"
        label="Nom"
        placeholder="Votre nom"
        required
        autoComplete="email"
      />
      <Input
        type="number"
        name="amount"
        id="donation-amount"
        label="Votre don"
        placeholder="Votre don"
        required
        autoComplete="transaction-amount"
      />
      <Select
        options={countries}
        name="country"
        legend="Le pays de votre compte bancaire"
        placeholder="Le pays de votre compte bancaire"
        form="donation"
        required
        autoComplete="country"
        instanceId="donation-transaction-country"
      />
      <Select
        options={currencies}
        name="currency"
        legend="Devise"
        form="donation"
        required
        autoComplete="transaction-currency"
        instanceId="donation-transaction-currency"
      />
      <button
        type="submit"
        className="mt-4 rounded-lg border border-app bg-app px-4 py-2 text-white"
      >
        Je donne !
      </button>
    </fetcher.Form>
  );
};

export default Donation;
