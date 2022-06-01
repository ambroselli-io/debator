import { Form, Link, useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import ChallengeCard from "app/components/ChallengeCard";
import { challengeFormat } from "app/db/methods/challenge-format.server";
import ChallengeModel from "app/db/models/challenge.server";
import useNavigateToNextStep from "app/utils/useNavigateToNextStep";
import SearchInput from "../../components/SearchInput";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  // all
  if (!searchParams.get("search")?.length) {
    // get challenges

    const challenges = await ChallengeModel.find();

    return {
      challenges: challenges.map(challengeFormat),
    };
  }

  const challenges = await ChallengeModel.aggregate([
    {
      $match: {
        $text: {
          $search: searchParams.get("search"),
          $caseSensitive: false,
          $diacriticSensitive: false,
        },
      },
    },
    {
      $project: {
        score: { $meta: "textScore" },
        title: 1,
        description: 1,
        excludeEnvironment: 1,
      },
    },
    {
      $sort: { score: { $meta: "textScore" } },
    },
  ]);

  return {
    challenges: challenges.map(challengeFormat),
  };
};

const SearchChallenge = () => {
  const { challenges } = useLoaderData();
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const navigateToNextStep = useNavigateToNextStep();

  return (
    <>
      <details className="w-full max-w-[68ch]" open>
        <summary className="w-full">
          <h2 className="ml-2 mb-2 inline w-full text-lg font-bold">
            Recherchez un défi
          </h2>
        </summary>
        <Form
          method="get"
          className="flex w-full flex-col gap-3 p-4"
          onChange={(e) => submit(e.currentTarget)}
        >
          <input
            type="hidden"
            name="mode"
            defaultValue={searchParams.get("mode") || undefined}
          />
          <input
            type="hidden"
            name="topicId"
            defaultValue={searchParams.get("topicId")}
          />
          <label htmlFor="search">🤔 Qu'est-ce qui vous ferait plaisir ?</label>
          <SearchInput
            placeholder="Entrez un mot-clé"
            name="search"
            label="Entrez un mot clé"
            defaultValue={searchParams.get("search") || ""}
            className="mb-2"
          />
        </Form>
      </details>
      {!challenges.length && (
        <p className="max-w-[68ch] text-center text-sm">
          Désolé, nous n'avons aucun défi en stock correspondant à ces critères&nbsp;🤷‍♀️
          <br />
          <br />
          Si vous pensez à un défi, envoyez-nous un message et nous l'intégrerons dans
          notre liste&nbsp;!&nbsp;🤓
        </p>
      )}
      {!!challenges.length && (
        <details className="w-full max-w-[68ch]" open>
          <summary className="w-full">
            <h2 className="ml-2 mt-4 mb-2 inline w-full text-lg font-bold">
              Voici les défis disponibles 👇
            </h2>
          </summary>
          <main className="flex flex-col p-4">
            {challenges.map((challenge) => (
              <Link
                key={challenge._id}
                to={navigateToNextStep("challengeId", challenge._id)}
              >
                <ChallengeCard challenge={challenge} />
              </Link>
            ))}
          </main>
        </details>
      )}
    </>
  );
};

export default SearchChallenge;
