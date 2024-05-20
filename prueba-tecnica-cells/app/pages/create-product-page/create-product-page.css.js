import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
:host {
  --bbva-web-progress-bar-bg-color: var(--colorsSecondary300, ${unsafeCSS(foundations.colors.secondary300)});
  display: block;
  box-sizing: border-box;
  font-size: var(--typographyTypeSmall, ${unsafeCSS(foundations.typography.typeSmall)});
  line-height: var(--lineHeightTypeSmall, ${unsafeCSS(foundations.lineHeight.typeSmall)});
}

form {
  width: 40%;
  margin: 3rem auto 1rem;
}
form > * {
  margin-bottom: 1rem;
}
form bbva-web-form-fieldset {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
form bbva-web-form-text {
  box-sizing: border-box;
}
form h3 {
  font-weight: var(--fontFacePrimaryMediumFontWeight, ${unsafeCSS(foundations.fontFacePrimary.medium.fontWeight)});
}
form h2 {
  color: black;
}
`;
