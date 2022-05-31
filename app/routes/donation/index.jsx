import ISOCountries from "i18n-iso-countries";
import Input from "app/components/Input";
import { Select } from "app/components/Selects";
import { useFetcher, useLoaderData } from "remix";
import { getClientLocales } from "remix-utils";
import { useEffect } from "react";

export const loader = ({ request }) => {
  let locales = getClientLocales(request);
  if (!locales) locales = ["en"];
  if (typeof locales === "string") locales = [locales];
  const twoLettersLocales = locales?.map((local) => local.split("-")[0]);
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
      { value: "EUR", label: "€ Euro" },
      { value: "DOLLAR", label: "$ Dollar" },
    ],
  };
};

const Donation = () => {
  const { countries, currencies } = useLoaderData();
  const fetcher = useFetcher();
  useEffect(() => {
    if (fetcher?.data?.connect?.url) window.location.href = fetcher?.data?.connect?.url;
  }, [fetcher?.data?.connect?.url]);

  return (
    <fetcher.Form
      id="donation"
      method="POST"
      action="/actions/fintecture/payment-request"
      className="flex w-full flex-col items-center gap-8"
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
        label="Email"
        placeholder="Votre email"
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
        defaultValue={30}
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
        defaultValue={{ value: "fr", label: "France" }}
      />
      <Select
        options={currencies}
        name="currency"
        legend="Devise"
        form="donation"
        required
        autoComplete="transaction-currency"
        instanceId="donation-transaction-currency"
        defaultValue={currencies[0]}
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
