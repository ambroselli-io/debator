import Modal from "app/components/Modal";
import useSearchParamState from "app/services/searchParamsUtils";

const ChooseEnvironment = ({ fetcher }) => {
  const [showChooseEnvironment, setShowChooseEnvironment] = useSearchParamState(
    "choisir-environment",
    false
  );

  if (!showChooseEnvironment) return null;

  return (
    <Modal
      isOpen
      hide={() => setShowChooseEnvironment(false)}
      title="Choisissez votre environnement"
    >
      <section className="flex flex-col items-center justify-around gap-4 bg-opacity-10 py-4">
        <p className="mb-2 text-center">
          Il existe trois environnements pour jouer à Debator, <wbr />
          avec une sélection de sujets&nbsp;et&nbsp;défis&nbsp;adaptés.
          <br />
          Vous pouvez changer d'environnement quand vous voulez&nbsp;!
        </p>
        <fetcher.Form
          id="choose-environment"
          method="POST"
          className="flex flex-wrap justify-center gap-4"
          action="/actions/choose-environment"
          onSubmit={() => setShowChooseEnvironment(false)}
        >
          <button
            type="submit"
            value="Éducation"
            name="environment"
            className="rounded-full bg-blue-500 py-2 px-6 text-white"
          >
            Éducation
          </button>
          <button
            value="Tout"
            type="submit"
            name="environment"
            className="rounded-full bg-[#ff1345] py-2 px-6 text-white"
          >
            Classique
          </button>
          <button
            value="Absurde"
            type="submit"
            name="environment"
            className="rounded-full bg-black py-2 px-6 text-white"
          >
            Absurde
          </button>
        </fetcher.Form>
      </section>
    </Modal>
  );
};

export default ChooseEnvironment;
