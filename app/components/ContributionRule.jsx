const ContributionRule = ({ startWithStar }) => (
  <small>
    {startWithStar && <sup>*</sup>}
    Toute contribution doit être validée par la direction du jeu avant d'être rendue
    disponible. 10% des bénéfices seront reversés aux contributeurs et répartis à
    proportion de leur contribution validée.
  </small>
);

export default ContributionRule;
