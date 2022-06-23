import React, { useEffect, useState } from "react";
import "./App.css";
import {
  DateRangeFacet,
  MultiMatchQuery,
  RangeFacet,
  RefinementSelectFacet,
} from "@searchkit/sdk";
import { useSearchkitVariables } from "@searchkit/client";
import Searchkit from "@searchkit/sdk";
import { useSearchkitSDK } from "@searchkit/sdk/lib/esm/react-hooks";
import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiFlexGroup,
  EuiTitle,
  EuiText,
  EuiPage,
  EuiPageSideBar,
  EuiHorizontalRule,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  Pagination,
} from "@elastic/eui";
import {
  FacetsList,
  SearchBar,
  SelectedFilters,
  ResetSearchButton,
} from "@searchkit/elastic-ui";

interface ConfigData {
  host: string;
  connectionOptions: {
    apiKey: string;
  };
  index: string;
  hits: {
    fields: string[];
  };
  query: any;
  facets: any[];
}

const config: ConfigData = {
  host: "https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243",
  connectionOptions: {
    apiKey: "NWF4c2VYOEJzRDhHMzlEX1JDejU6YnJXaS1XWjlSZ2F5ek1Cc3V4aXV6dw==",
  },
  index: "imdb_movies",
  hits: {
    fields: [
      "title",
      "genres",
      "directors",
      "writers",
      "actors",
      "countries",
      "plot",
    ],
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

const App = () => {
  const [data, setData] = useState<any>();

  const dataf = async () => {
    const request = Searchkit(config);
    const response = await request
      // .setFilters([{ identifier: "metascore", min: 10, max: 20 }])
      .setSortBy("released")
      .execute({
        facets: true,
        hits: {
          size: 2000,
          from: 0,
        },
      });
    setData(response);
    return response;
  };

  useEffect(() => {
    dataf();
  }, []);

  data && console.log(data);

  const Facets = FacetsList([]);
  return (
    <>
      <EuiPage style={{ display: "flex" }}>
        <EuiPageSideBar>
          <h1>Hello</h1>
          <SearchBar loading={false} />
          {/* <SelectedFilters data={data} loading={true} /> */}
          <Facets data={data} loading={true} />
        </EuiPageSideBar>
        <EuiPageBody>Hello</EuiPageBody>
      </EuiPage>
    </>
  );
};

export default App;
