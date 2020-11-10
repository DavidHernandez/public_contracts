# Spanish public contracts
This project can parse the XML format of the Spanish public contracts and make them searchable.

The contract files can be found here: https://www.hacienda.gob.es/es-ES/GobiernoAbierto/Datos%20Abiertos/Paginas/licitaciones_plataforma_contratacion.aspx

Link with the explanation of the XML format: https://www.hacienda.gob.es/Documentacion/Publico/D.G.%20PATRIMONIO/Plataforma_Contratacion/especificacion-sindicacion-1-3.pdf

## Documentation

Run the project with: `docker-compose up`

Drop the files into the `data` folder.

Index the files with `docker-compose exec app npm run index-data`

Delete the index with `docker-compose exec app npm run delete`

Search with `docker-compose exec app npm run search {query}`

Sample search: `docker-compose exec app npm run search '{ "query": { "match": { "summary": "covid" } } }'`
