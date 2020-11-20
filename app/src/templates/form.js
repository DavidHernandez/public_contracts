const ContractsFormTemplate = document.createElement('template')
ContractsFormTemplate.innerHTML = `
  <h1>Buscador contratos públicos</h1>
  <div>
    <label for="title">Titulo</label>
    <input id="title" type="text"></input>
    <label for="title-comparer">Comparador</label>
    <select name="title-comparer" id="title-comparer">
      <option value="term">Coincidencia exacta</option>
      <option value="terms">Una o mas palabras coinciden</option>
      <option value="prefix">La palabra empieza por</option>
    </select>
  </div>
  <div>
    <label for="entity">Órgano de Contratación</label>
    <input id="entity" type="text"></input>
    <label for="entity-comparer">Comparador</label>
    <select name="entity-comparer" id="entity-comparer">
      <option value="term">Coincidencia exacta</option>
      <option value="terms">Una o mas palabras coinciden</option>
      <option value="prefix">La palabra empieza por</option>
    </select>
  </div>
  <div>
    <label for="processing">Tipo de tramitación</label>
    <input id="processing" type="text"></input>
    <label for="processing-comparer">Comparador</label>
    <select name="processing-comparer" id="processing-comparer">
      <option value="term">Coincidencia exacta</option>
      <option value="terms">Una o mas palabras coinciden</option>
      <option value="prefix">La palabra empieza por</option>
    </select>
  </div>
  <div>
    <label for="type">Tipo de contrato</label>
    <input id="type" type="text"></input>
    <label for="type-comparer">Comparador</label>
    <select name="type-comparer" id="type-comparer">
      <option value="term">Coincidencia exacta</option>
      <option value="terms">Una o mas palabras coinciden</option>
      <option value="prefix">La palabra empieza por</option>
    </select>
  </div>
  <div>
    <label for="subtype">Subtipo de contrato</label>
    <input id="subtype" type="text"></input>
    <label for="subtype-comparer">Comparador</label>
    <select name="subtype-comparer" id="subtype-comparer">
      <option value="term">Coincidencia exacta</option>
      <option value="terms">Una o mas palabras coinciden</option>
      <option value="prefix">La palabra empieza por</option>
    </select>
  </div>
  <div>
    <button id="submit">Buscar</button>
  </div>
`

export default ContractsFormTemplate
