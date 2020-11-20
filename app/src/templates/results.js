const ResultsTemplate = document.createElement('template')
ResultsTemplate.innerHTML = `
  <style>
    .hidden {
      display: none;
    }
  </style>
  <div id="wrapper" class="hidden">
    <h1>Results</h1>
    <h2>Total: <span id="total"></span></h2>
    <div id="results"></div>
    <button id="download">Download</button>
    <div id="pager"></div>
  </div>
`

export default ResultsTemplate
