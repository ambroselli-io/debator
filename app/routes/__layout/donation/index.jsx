import ISOCountries from "i18n-iso-countries";
import Input from "app/components/Input";
import { Select } from "app/components/Selects";
import { useFetcher, useLoaderData } from "remix";
import { getClientLocales } from "remix-utils";
import { useEffect, useRef, useState } from "react";
import OpenInNewWindowIcon from "app/components/icons/OpenInNewWindowIcon";
import useSearchParamState from "app/services/searchParamsUtils";
import ContactUs from "app/components/ContactUs";
import { getUnauthentifiedUserFromCookie } from "app/services/auth.server";

export const loader = async ({ request }) => {
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
  const user = await getUnauthentifiedUserFromCookie(request);
  return {
    countries: arrayOfCountriesForSelect,
    user,
    currencies: [
      { value: "EUR", label: "€ Euro" },
      { value: "DOLLAR", label: "$ Dollar" },
    ],
  };
};

const Donation = () => {
  const { countries, currencies, user } = useLoaderData();
  const fetcher = useFetcher();

  useEffect(() => {
    // https://help.fintecture.com/en/articles/5843235-how-to-test-the-module-before-going-into-production
    // On the Connect (payment interface), choose the CIC or Crédit Mutuel bank
    if (fetcher?.data?.connect?.url) window.location.href = fetcher?.data?.connect?.url;
  }, [fetcher?.data?.connect?.url]);

  useEffect(() => {
    // https://help.fintecture.com/en/articles/5843235-how-to-test-the-module-before-going-into-production
    // On the Connect (payment interface), choose the CIC or Crédit Mutuel bank
    if (fetcher?.data?.error) alert(fetcher?.data?.error);
  }, [fetcher?.data?.error]);

  const [donation, setDonation] = useState("");
  const [showContactUs, setShowContactUs] = useSearchParamState("contactez-nous", false);

  const monthlyLicenceRef = useRef();
  const yearlyLicenceRef = useRef();
  const lifelyLicenceRef = useRef();
  useEffect(() => {
    if (donation >= 100) {
      lifelyLicenceRef.current.checked = true;
    }
    if (donation < 100) {
      if (lifelyLicenceRef.current.checked) lifelyLicenceRef.current.checked = false;
      if (donation >= 10) yearlyLicenceRef.current.checked = true;
    }
    if (donation < 10) {
      if (yearlyLicenceRef.current.checked) yearlyLicenceRef.current.checked = false;
      if (donation >= 0) monthlyLicenceRef.current.checked = true;
    }
    if (donation <= 0) {
      if (monthlyLicenceRef.current.checked) monthlyLicenceRef.current.checked = false;
      if (yearlyLicenceRef.current.checked) yearlyLicenceRef.current.checked = false;
      if (lifelyLicenceRef.current.checked) lifelyLicenceRef.current.checked = false;
    }
  }, [donation, user?.licence]);

  return (
    <>
      <fetcher.Form
        id="donation"
        method="POST"
        action="/actions/fintecture/payment-request"
        className="flex w-full max-w-[68ch] flex-col items-center gap-8"
      >
        <h1 className="mt-8 mb-4 text-3xl font-bold text-app">
          {!user?.licence
            ? "Acheter une licence Debator"
            : user?.licence !== "lifely"
            ? "Renouveler ma licence Debator"
            : "Faire un don à Debator"}
        </h1>
        {user?.licence !== "lifely" ? (
          <>
            <p className="mt-4 max-w-[68ch]">
              Le prix de Debator est un prix en fonction de l'utilité que vous y trouvez
              ou de ce que vous avez envie de donner pour en avoir une version.
            </p>
            <p className="mt-4 max-w-[68ch]">
              Les licences sont limitées dans le temps, parce que nous faisons évoluer
              Debator au fil des retours utilisateurs, nous enrichissons constamment les
              sujets, les défis... Les seules contraintes que nous avons sont:
            </p>
            <ul className="list-inside list-disc">
              <li>
                pour avoir une <b>licence à vie</b>, votre prix doit être supérieur ou
                égal à <b>100€</b>
              </li>
              <li>
                pour avoir une <b>licence pendant 1 an</b>, votre prix doit être supérieur
                ou égal à <b>10€</b>
              </li>
              <li>
                tout prix inférieur à 10€ donne une <b>licence pendant 1 mois</b>
              </li>
            </ul>
            <p className="mt-4 w-full max-w-[68ch]">
              Choisissez votre licence <b>(prix TTC)</b>, avant de renseigner vos
              informations. Si vous êtes intéressé(es) par Debator mais que vous n'avez
              pas les moyens,{" "}
              <button
                type="button"
                className="underline"
                onClick={() => setShowContactUs(true)}
              >
                contactez-nous
              </button>{" "}
              et nous vous enverrons une version complète gratuite.
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 max-w-[68ch]">
              Vous aimez Debator et vous souhaitez nous soutenir ? Vous pouvez faire le
              don que vous souhaitez !
            </p>
          </>
        )}
        <div className="flex justify-center">
          <Input
            type="number"
            name="amount"
            id="donation-amount"
            placeholder="Votre prix"
            required
            autoComplete="transaction-amount"
            className="w-40 rounded-r-none border-r-0"
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
            className="shrink-0 rounded-l-none border-l-0"
            customStyles={{
              borderLeft: "none",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          />
        </div>
        <div
          className={`flex w-full flex-wrap justify-evenly gap-5 ${
            user?.licence === "lifely" ? "hidden" : ""
          }`}
        >
          <fieldset className="flex shrink-0 grow-0 basis-52" disabled={donation <= 0}>
            <input
              type="radio"
              required
              className="peer"
              name="licence"
              id="monthly"
              value="monthly"
              ref={monthlyLicenceRef}
            />
            <label
              htmlFor="monthly"
              className="shrink-0 grow cursor-pointer rounded-lg border border-app border-opacity-60 bg-white p-10 text-center text-xl font-bold text-app disabled:opacity-50 peer-checked:border-2 peer-checked:border-opacity-100 peer-invalid:border-app peer-disabled:pointer-events-none peer-disabled:opacity-30"
            >
              Licence
              <br />
              mensuelle
            </label>
          </fieldset>
          <fieldset className="flex shrink-0 grow-0 basis-52" disabled={donation < 10}>
            <input
              type="radio"
              required
              className="peer"
              name="licence"
              id="yearly"
              value="yearly"
              ref={yearlyLicenceRef}
            />
            <label
              htmlFor="yearly"
              className="shrink-0 grow cursor-pointer rounded-lg border border-app border-opacity-60 bg-white p-10 text-center text-xl font-bold text-app disabled:opacity-50 peer-checked:border-2 peer-checked:border-opacity-100 peer-invalid:border-app peer-disabled:pointer-events-none peer-disabled:opacity-30"
            >
              Licence
              <br />
              annuelle
            </label>
          </fieldset>
          <fieldset className="flex shrink-0 grow-0 basis-52" disabled={donation < 100}>
            <input
              type="radio"
              required
              className="peer"
              name="licence"
              id="lifely"
              value="lifely"
              ref={lifelyLicenceRef}
            />
            <label
              htmlFor="lifely"
              className="shrink-0 grow cursor-pointer rounded-lg border border-app border-opacity-60 bg-white p-10 text-center text-xl font-bold text-app disabled:opacity-50 peer-checked:border-2 peer-checked:border-opacity-100 peer-invalid:border-app peer-disabled:pointer-events-none peer-disabled:opacity-30"
            >
              Licence
              <br />à vie
            </label>
          </fieldset>
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
          defaultValue={user?.firstName || ""}
        />
        <Input
          type="text"
          name="lastName"
          id="donation-lastName"
          label="Nom"
          placeholder="Votre nom"
          required
          autoComplete="family-name"
          defaultValue={user?.lastName || ""}
        />
        <Input
          type="email"
          name="email"
          id="donation-email"
          inputMode="email"
          label="Email"
          placeholder="Votre email"
          required={!user?.email}
          autoComplete="email"
          defaultValue={user?.email || ""}
          disabled={!!user?.email}
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
        <p className="mt-4 w-full max-w-[68ch]">
          Lorsque vous cliquerez sur le bouton <b className="text-app">Je donne</b>{" "}
          ci-dessous, vous serez redirigé vers une page de paiement direct de banque à
          banque, géré par l'entreprise{" "}
          <a
            className="inline-flex items-center gap-2 underline"
            href="https://www.fintecture.com"
          >
            Fintecture <OpenInNewWindowIcon className="h-3 w-3" />
          </a>
        </p>
        <button
          type="submit"
          className="mt-4 rounded-lg border border-app bg-app px-4 py-2 text-white disabled:opacity-50"
          disabled={fetcher.state !== "idle" || fetcher?.data?.ok}
        >
          {fetcher?.state === "submitting"
            ? "Demande en cours..."
            : fetcher?.data?.ok
            ? "Redirection..."
            : "Je donne !"}
        </button>
        <button
          type="button"
          className="my-4 text-sm text-app underline"
          onClick={() => setShowContactUs(true)}
        >
          Nous contacter
        </button>
      </fetcher.Form>
      {!!showContactUs && (
        <ContactUs isOpen hide={() => setShowContactUs(false)} user={user} />
      )}
    </>
  );
};

export default Donation;
