# Proyecto CELLS

Se trata del desarrollo de una Aplicación para poder crear productos, almacenarlos en el local storage y ver el listado de éstos.

## Objetivos del proyecto

El usuario puede:

✅ Insertar a través de un formulario: el nombre, la URL de una imagen, y el precio del producto

✅ Ver la información insertada en el local storage del navegador

✅ Visualizar los productos creados

## Explicación Código

En el proyecto podemos encontrar

- login-page --> es la home, a través de la cuál podremos hacer click en el botón "Crear productos" y nos redirigirá a: create-product

- create-product-page --> es la page en la que encontraremos el formulario a través del cuál insertaremos los productos que queramos agregar - cuando el usuario haga click en el botón "Enviar datos" será redirigido a: list-product

- list-product-page --> es la page en la cuál podremos ver el producto en formato "card"
  si quiere insertar más productos hará click en el botón "Atrás" y será redirigido al formulario, sinó en el icono "Salir"(será redirigido a la home)

#### Componentes utilizados:

🔹 @bbva-web-components/bbva-web-form-text - para poder insertar el nombre y la URL de la imagen del producto

```javascript
import "@bbva-web-components/bbva-web-form-text/bbva-web-form-text.js";
```

🔹 @bbva-web-components/bbva-web-form-amount

```javascript
import "@bbva-web-components/bbva-web-form-amount/bbva-web-form-amount.js";
```

🔹 @bbva-web-components/bbva-web-button-default

```javascript
import "@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js";
```

#### Propiedades

Metidas dentro del objeto static properties, el cuál permite crear propiedades reactivas

```javascript
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
```

#### Método render()

Usado para definir la plantilla del componente y mostrar el contenido en la interfaz

```javascript
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
```

#### Constructor

Para instanciar las propiedades

```javascript
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
```

#### Ciclos de Vida

Los ciclos de vida utilizados para esta aplicación son:

✔️ firstUpdated() --> componente en el que tengo acceso al shadowRoot.
En este caso estoy accediendo a localStorage para obtener el idioma

```javascript
 firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);
    window.IntlMsg.lang = localStorage.getItem('language') || 'es-ES';
  }
```

✔️ update() --> utilizado para las traducciones; se ejecuta cuando la propiedad i18nkeys cambia

```javascript
  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }

    super.update && super.update(props);
  }
```

✔️ onPageEnter() --> se suscribe al evento publicado en create-product-page y se dispara antes de que se renderice list-product-page

```javascript
  onPageEnter() {
    this.subscribe('create-product', () => {
      this.productsList = JSON.parse(localStorage.getItem('formProduct'));
    });
  }
```

#### Publish y Subscribe

Al this.publish -- le paso el array con el listado de productos

```javascript
this.publish("create-product", this.productsList);
```

En el this.subscribe -- recupero los datos del local storage

```javascript
this.subscribe("create-product", () => {
  this.productsList = JSON.parse(localStorage.getItem("formProduct"));
});
```

#### Uso de Slots

Para asignar dentro del Shadow Root un espacio, y así inyectar desde fuera, en este ejemplo, el formulario

```javascript
<div slot="app-main-content">${this._formCreateProduct}</div>
```
