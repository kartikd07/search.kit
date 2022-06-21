import React from "react";
import "./App.css";
import {
  DateRangeFacet,
  MultiMatchQuery,
  RangeFacet,
  RefinementSelectFacet,
} from "@searchkit/sdk";
import { useSearchkitVariables } from "@searchkit/client";
import { useSearchkitSDK } from "@searchkit/sdk/lib/esm/react-hooks";

const config: any = {
  host: "https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243",
  connectionOptions: {
    apiKey: "NWF4c2VYOEJzRDhHMzlEX1JDejU6YnJXaS1XWjlSZ2F5ek1Cc3V4aXV6dw==",
  },
  index: "imdb_movies",
  hits: {
    fields: ["title"],
  },
  query: new MultiMatchQuery({
    fields: [
      "title",
      "genres",
      "directors",
      "writers",
      "actors",
      "countries",
      "plot",
    ],
  }),
  facets: [
    new RefinementSelectFacet({
      field: "type",
      identifier: "type",
      label: "Type",
      multipleSelect: true,
    }),
    new RangeFacet({
      field: "metascore",
      identifier: "metascore",
      label: "Metascore",
      range: {
        min: 0,
        max: 100,
        interval: 5,
      },
    }),
    new DateRangeFacet({
      field: "released",
      identifier: "released",
      label: "Released",
    }),

    new RefinementSelectFacet({
      field: "genres.keyword",
      identifier: "genres",
      label: "Genres",
      multipleSelect: true,
    }),

    new RefinementSelectFacet({
      field: "countries.keyword",
      identifier: "countries",
      label: "Countries",
    }),
    new RefinementSelectFacet({
      field: "rated",
      identifier: "rated",
      label: "Rated",
      multipleSelect: true,
    }),
    new RefinementSelectFacet({
      field: "directors.keyword",
      identifier: "directors",
      label: "Directors",
    }),

    new RefinementSelectFacet({
      field: "writers.keyword",
      identifier: "writers",
      label: "Writers",
    }),

    new RefinementSelectFacet({
      field: "actors.keyword",
      identifier: "actors",
      label: "Actors",
      multipleSelect: true,
    }),

    new RangeFacet({
      field: "imdbrating",
      identifier: "imdbrating",
      label: "IMDB Rating",
      range: {
        interval: 1,
        max: 10,
        min: 1,
      },
    }),
  ],
};

function App() {
  const variables = useSearchkitVariables();
  const { results, loading } = useSearchkitSDK(config, variables);
  results && console.log(results);

  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
