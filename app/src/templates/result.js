const ResultTemplate = document.createElement('template')
ResultTemplate.innerHTML = `
  <div>
    <h3><a id="link" href=""></a></h1>
    <p>Presupuesto: <span id="budget"></span></p>
    <p>Tipo de contrato: <span id="type"></span></p>
    <p>Subtipo de contrato: <span id="subtype"></span></p>
    <p>Tipo de tramitación: <span id="processing"></span></p>
    <p>Organismo contratante: <span id="contracting"></span></p>
    <p>Estado: <span id="status"></span></p>
  </div>
`

export default ResultTemplate
