/* eslint-disable no-unused-expressions */
import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaClimateaction } from '@bbva-web-components/bbva-foundations-icons';
import '@bbva-web-components/bbva-core-collapse/bbva-core-collapse.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-web-header-public-web/bbva-web-header-public-web.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer.js';
import '@bbva-web-components/bbva-web-panel-outstanding-opportunity/bbva-web-panel-outstanding-opportunity.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';
import '@cells-demo/demo-web-template/demo-web-template.js';
import styles from './login-page-styles.js';

const panelIcons = {
  climateaction: bbvaClimateaction(),
};

const DEFAULT_I18N_KEYS = {
  createProduct: 'login-page.menu-create-product',
  footerClaim: 'login-page.footer-claim',
  heading: 'login-page.card-heading',
  bodyText: 'login-page.card.body-text'
};

/* eslint-disable new-cap */
class LoginPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'login-page';
  }

  static get properties() {
    return {

      i18nKeys: {
        type: Object,
        attribute: false,
      }
    };
  }

  constructor() {
    super();

    this.i18nKeys = {};
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

  // Deberíamos traducir titulo de la pagina, y borrar elementos que no utilizamos como el menu y los botones superiores.
  // this.t('key-title-page-home')
  
  render() {
    return html` 
      <demo-web-template
        page-title="Home"
      >
        <div slot="app-top-content">
          ${this._headerHome}
        </div>

        <div slot="app-main-content">
          ${this._bodyHome()}
        </div>

        <div slot="app-main-content" data-grid="full-width">
          ${this._footerHome}
        </div>

      </demo-web-template>
    `;
  }

  get _headerHome() {
    return html`
      <bbva-web-header-public-web 
        description="BBVA Home" 
        show-login
      >
        <bbva-web-button-default 
          id="access"
          class="login" 
          size="l" 
          slot="login-desktop"
          variant="positive" 
          @click="${this._onLoginClick}"
        >
          ${this.t(this._i18nKeys.createProduct)}
        </bbva-web-button-default>
      </bbva-web-header-public-web>
    `;
  }

  _bodyHome() {
    return html`
      <div class="opportunity">
        <bbva-web-panel-outstanding-opportunity>
          <bbva-web-panel-outstanding-opportunity-item 
            heading=${this.t(this._i18nKeys.heading)}
            heading-icon="${panelIcons.climateaction}" 
            link="" slot="main" 
            bg-img="./resources/example.jpg"
            
          >
          ${this.t(this._i18nKeys.bodyText)}
          </bbva-web-panel-outstanding-opportunity-item>
        </bbva-web-panel-outstanding-opportunity>
      </div>
    `;
  }

  get _footerHome() {
    return html`
      <bbva-web-module-footer 
        copyright="© 2024"
        claim="${this.t(this._i18nKeys.footerClaim)}"
      >  
      </bbva-web-module-footer>
    `;
  }

  _onLoginClick() {
    this.navigate('create-product');
  }
}

window.customElements.define(LoginPage.is, LoginPage);
