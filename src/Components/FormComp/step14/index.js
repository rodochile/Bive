import "bootstrap/dist/css/bootstrap.css";
import "./step14.css";
import FadeIn from "react-fade-in";


const Step14 = ({ onButtonClick }) => {

   //categoriasubcadenaintolesolo=localStorage.getItem('categoriasubcadenaintolesolo')? let categoriasubcadenaintolesolo=localStorage.getItem('categoriasubcadenaintolesolo'):''
  //const itemprodCadena=["aceite-de-coco","harinas","harinas-para-hornear","levadura-y-polvos-de-hornear","alfajores-y-bombones","chocolates-para-cocinar"];
  //const categoriasubcadenaintolesolo=["producto-chileno","sin-sellos"];
  //const contenido=["producto-chileno","sin-sellos"];
 



  const handleButtonClick = () => {

    const storedItemprodCadena = localStorage.getItem('itemprodCadena');
    const storedCategoriasubcadenaintolesolo = localStorage.getItem('categoriasubcadenaintolesolo');
    const storedContenido = localStorage.getItem('contenido');
    
    console.log('storedItemprodCadena', storedItemprodCadena);
    console.log('storedCategoriasubcadenaintolesolo', storedCategoriasubcadenaintolesolo);
    console.log('storedContenido', storedContenido);
    
    const itemprodCadena = storedItemprodCadena ? JSON.parse(storedItemprodCadena) : [];
    const categoriasubcadenaintolesolo = storedCategoriasubcadenaintolesolo ? JSON.parse(storedCategoriasubcadenaintolesolo) : [];
    const contenido = storedContenido ? JSON.parse(storedContenido) : [];
    
    console.log('itemprodCadena', itemprodCadena);
    console.log('categoriasubcadenaintolesolo', categoriasubcadenaintolesolo);
    console.log('contenido', contenido);
  
    const ingredientes2 = [
      ...itemprodCadena.map(item => `${item.trim()}`),
      ...categoriasubcadenaintolesolo.map(item => `${item.trim()}`),
      ...contenido.map(item => `${item.trim()}`)
    ];
   // const ingredientesConCorchetes = `[${ingredientes2}]`;
    console.log('ingridiente con corchetes',ingredientes2)

    


    

   // onButtonClick();

   const fetchData = async (ingredientes, nombreReceta = "") => {
    const apiUrl = 'https://s-api.comoquiero.net/shortUrls/links';
    const domain = "beroots.qcart.app"
    const origin = 'https://www.beroots.cl/?qcart=true#'
    const requestOptions = {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
        'Accept': 'application/json',
        'Accept-Language': 'es-CL,es;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
        'Referer': 'https://clients.qcart.app/',
        'Origin': 'https://clients.qcart.app',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'Connection': 'keep-alive',
        'TE': 'trailers',
      },
      body: JSON.stringify({
        domain: domain,
        originalURL: origin + 'ingrs=' + encodeURIComponent(ingredientes.join("\n")) + '&utm_source=beroots&utm_medium=referral&utm_campaign=clients.qcart.app&utm_term=qcart&utm_content=link-beroots&recipe_name=' + nombreReceta,
      }),
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const shortUrl = data.shortURL
      if (shortUrl) {
        console.log(shortUrl);
        window.location.href = shortUrl;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const ingredientes = ["avena", "aceite de oliva", "harina de chía"]
  console.log('del', ingredientes)
  const nombreReceta = "mi receta"

  fetchData(ingredientes2, nombreReceta)

  
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12-lg mx-auto">
          <FadeIn>
            <h1 className="paragraform mx-auto">
              ¿Gracias por tu tiempo ya tu Carrito de compras  esta listo
              <br />.
            </h1>
            <h1 className="paragraformsub mx-auto">
             Trataremos de ser lo mas preciso en tus selecciones, gracias por elegirnos.
      
              <br /> 
            </h1>

            <div className="box-f2">
              <button
                type="button"
                className="mybuttonFormstep1"
            onClick={handleButtonClick}
              >
                Aceptar
              </button>

            </div>
            <div>
              <div className="box-f3">
                
      
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Step14;
