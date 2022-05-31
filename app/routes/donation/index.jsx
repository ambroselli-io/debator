import ISOCountries from "i18n-iso-countries";
import Input from "app/components/Input";
import { Select } from "app/components/Selects";
import { useFetcher, useLoaderData } from "remix";
import { getClientLocales } from "remix-utils";
import { useEffect, useState } from "react";
import CheckBoxGroup from "app/components/CheckBoxGroup";

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

  const [donation, setDonation] = useState(null);

  return (
    <>
      <fetcher.Form
        id="donation"
        method="POST"
        action="/actions/fintecture/payment-request"
        className="flex w-full max-w-[68ch] flex-col items-center gap-8"
      >
        <h1 className="text-3xl font-bold text-app">Acheter une licence de Debator</h1>
        <p className="mt-4 max-w-[68ch]">
          Nous avons décidé de ne pas mettre de prix fixe, mais un prix en fonction de
          l'utilité que vous y trouvez ou de ce que vous avez envie de donner pour en
          avoir une version.
        </p>
        <p className="mt-4 max-w-[68ch]">
          Les licences sont limitées dans le temps, parce que nous faisons évoluer Debator
          au fil des retours utilisateurs, nous enrichissons constamment les sujets, les
          défis...
        </p>
        <p className="mt-4 w-full max-w-[68ch]">
          Les seules contraintes que nous avons sont:
          <ul className="list-inside list-disc">
            <li>
              pour avoir une licence à vie, votre don doit être supérieur ou égal à 100€
            </li>
            <li>
              pour avoir une licence pendant 1 an, votre don doit être supérieur ou égal à
              10€
            </li>
            <li>tout don inférieur à 10€ donne une licence valable pendant 1 mois</li>
          </ul>
        </p>
        <div className="flex justify-center">
          <Input
            type="number"
            name="amount"
            id="donation-amount"
            placeholder="Votre don"
            required
            autoComplete="transaction-amount"
            className="w-40"
            value={donation}
            onChange={(e) => setDonation(e.target.value)}
          />
          <Select
            options={currencies}
            name="currency"
            form="donation"
            required
            autoComplete="transaction-currency"
            instanceId="donation-transaction-currency"
            defaultValue={currencies[0]}
            className="shrink-0"
          />
        </div>
        <div className="flex w-full justify-evenly gap-10">
          <button
            type="button"
            disabled={donation <= 0}
            className="tex-4xl shrink-0 grow rounded-lg border-2 border-app bg-white p-10 font-bold text-app disabled:opacity-50"
          >
            Licence
            <br />
            mensuelle
          </button>
          <button
            type="button"
            disabled={donation <= 10}
            className="tex-4xl shrink-0 grow rounded-lg border-2 border-app bg-white p-10 font-bold text-app disabled:opacity-50"
          >
            Licence
            <br />
            annuelle
          </button>
          <button
            type="button"
            disabled={donation <= 100}
            className="tex-4xl shrink-0 grow rounded-lg border-2 border-app bg-white p-10 font-bold text-app disabled:opacity-50"
          >
            Licence
            <br />à vie
          </button>
        </div>
        <article className="flex flex-col rounded-lg border border-app"></article>

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
        <Select
          options={countries}
          name="country"
          legend="Le pays de votre compte bancaire"
          placeholder="Le pays de votre compte bancaire"
          form="donation"
          required
          autoComplete="country"
          instanceId="donation-transaction-country"
          // defaultValue={{ value: "fr", label: "France" }}
          className="w-full"
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
          className="w-full"
        />
        <button
          type="submit"
          className="mt-4 rounded-lg border border-app bg-app px-4 py-2 text-white"
        >
          Je donne !
        </button>
      </fetcher.Form>
    </>
  );
};

export default Donation;
