import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import styles from './list-products-page.css.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';


const DEFAULT_I18N_KEYS = {
  backButton: 'list-products-page.back-button',
};


class ListProductsPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'list-products-page';
  }

  static get properties() {
    return {

      formProduct: { type: Object },
      productsList: { type: Array },

      i18nKeys: {
        type: Object,
        attribute: false,
      },
    };
  }

  constructor() {
    super();
    this.productsList = [];
    this.i18nKeys = {};
    this.onPageEnter();

  }

  static get styles() {
    return [ styles ];
  }

  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);
    window.IntlMsg.lang = localStorage.getItem('language') || 'es-ES';
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }

    super.update && super.update(props);
  }

  onPageEnter() {
    this.subscribe('create-product', () => {
      this.productsList = JSON.parse(localStorage.getItem('formProduct'));
    });
  }

  render() {
    return html`
     <demo-web-template
        page-title="ProductList"
      >

      <div slot="app-main-content">
          ${this._button}
      </div>
      
      <div slot="app-main-content" class="cardsSlot">
          ${this._cardProduct}
      </div>

 
      </demo-web-template>
    `;
  }


  get _cardProduct() {
    return html`
        ${this.productsList.map(item =>
    html`  <div class="productCards">
            <img src="${item.picture}" alt="producto dado de alta" id="imgCard">
            <h2 class="productNameCard">${item.productName}</h2>      
            <p class="priceCard">${item.price}</p>
            </div>
        `
  )}
      
    `;
  }

  get _button() {
    return html`
        <button
          id="back"
          class="backButton" 
          @click="${this._handleBackButton}"
        >
        ${this.t(this._i18nKeys.backButton)}
        </button>
    `;
  }

  _handleBackButton() {
    this.navigate('create-product');
  }
}
window.customElements.define(ListProductsPage.is, ListProductsPage);
