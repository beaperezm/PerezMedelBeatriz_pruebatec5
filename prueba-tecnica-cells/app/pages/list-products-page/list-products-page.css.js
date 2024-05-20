import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
:host {
  --bbva-web-progress-bar-bg-color: token("foundations.colors.secondary300");
  display: block;
  box-sizing: border-box;
  font-size: token("foundations.typography.typeSmall");
  line-height: token("foundations.lineHeight.typeSmall");
}

#imgCard {
  width: 100%;
  border-radius: 15px;
}

.productCards {
  padding: 30px;
  width: 32%;
  border: 2px solid lightgray;
  box-shadow: lightgray 3px 2px 8px 5px;
  border-radius: 15px;
  margin-top: 20px;
}

.cardsSlot {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 41px;
}

.backButton {
  color: #ffffff;
  padding: 16px 32px;
  background-color: #028484;
  font-size: 13px;
  font-family: "Benton Sans", sans-serif;
  font-weight: 500;
  border: none;
}
`;
