const ContractsFormTemplate = document.createElement('template')
ContractsFormTemplate.innerHTML = `
  <h1>Hola</h1>
  <div>
    <label for="title">Titulo</label>
    <input id="title" type="text"></input>
  </div>
  <div>
    <label for="entity">Órgano de Contratación</label>
    <input id="entity" type="text"></input>
  </div>
  <div>
    <label for="processing">Tipo de tramitación</label>
    <input id="processing" type="text"></input>
  </div>
  <div>
    <button id="submit">Buscar</button>
  </div>
`

export default ContractsFormTemplate
