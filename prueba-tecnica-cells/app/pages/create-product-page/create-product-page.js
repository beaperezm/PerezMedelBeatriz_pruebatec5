import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import styles from './create-product-page.css.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-web-form-text/bbva-web-form-text.js';
import '@bbva-web-components/bbva-web-form-amount/bbva-web-form-amount.js';


const DEFAULT_I18N_KEYS = {
  formHeading: 'login-page.form-heading',
  labelInput1: 'login-page.form-input-1-label',
  labelInput2: 'login-page.form-input-2-label',
  labelInput3: 'login-page.form-input-3-label',
  labelButton: 'login-page.form-button',
};

class CreateProductPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'create-product-page';
  }

  static get properties() {
    return {

      formProduct: { type: Object },
      productsList: { type: Array},

      i18nKeys: {
        type: Object,
        attribute: false,
      },
    };
  }

  constructor() {
    super();
    this.i18nKeys = {};
    this.formProduct = {
      productName: '',
      picture: '',
      price: ''
    };
    this.productsList = [];

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

  render() {
    return html`
     <demo-web-template
        page-title="CreateProduct"
      >

      <div slot="app-main-content">
          ${this._formCreateProduct}
      </div>
      </demo-web-template>
    `;
  }

  /* I use @input event because I want to log the value whenever the user change it */
  get _formCreateProduct() {
    return html`
        <form enctype="multipart/form-data">
          <h2>${this.t(this._i18nKeys.formHeading)}</h2>
          <bbva-web-form-text id="productName" label="${this.t(this._i18nKeys.labelInput1)}" value="${this.formProduct.productName}" @input="${this._handleForm}" ></bbva-web-form-text>
          <bbva-web-form-text id="picture" label="${this.t(this._i18nKeys.labelInput2)}" value="${this.formProduct.picture}" @input="${this._handleForm}" ></bbva-web-form-text>
          <bbva-web-form-amount id="price" label="${this.t(this._i18nKeys.labelInput3)}" value="${this.formProduct.price}" @input="${this._handleForm}" ></bbva-web-form-amount>
          <bbva-web-button-default
            id="send"
            type="submit" 
            @click="${this._handleSendData}"
          >
          ${this.t(this._i18nKeys.labelButton)}
          </bbva-web-button-default>
        </form>
    `;
  }

  /* I use this method to create a copy of formProduct object and collects the value of the productName, picture and price inputs */
  _handleForm(ev) {
    this.formProduct = {
      ...this.formProduct,
      [ev.target.id]: ev.target.value

    };
  }


  _handleSendData(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    this.productsList.push(this.formProduct);

    localStorage.setItem('formProduct', JSON.stringify(this.productsList));


    this.publish('create-product', this.productsList);
    this.navigate('list-products');
    this._resetFormProduct();
  }

  _resetFormProduct() {
    this.formProduct = {
      productName: '',
      picture: '',
      price: ''
    };
  }

}

window.customElements.define(CreateProductPage.is, CreateProductPage);