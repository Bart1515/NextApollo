import Layout from "../../components/layout";
import { initializeApollo, addApolloState } from "../../lib/apolloClient";
import { gql } from "@apollo/client";

export async function getStaticProps(props) {
  console.log("Countries");

  const client = initializeApollo();

  const CITIES_OF_COUNTRY = gql`
    {
      cities(where: { countryName: { eq: $ctry } }) {
        id
        name
      }
    }
  `;

  //params.id
  // const ctry = "Albania";
  const citiesData = await client.query({
    query: CITIES_OF_COUNTRY,
    variables: {
      ctry: props.params.id,
    },
  });

  return {
    props: {
      citiesData,
    },
  };
}

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        id: "Albania",
      },
    },
    {
      params: {
        id: "Nepal",
      },
    },
    {
      params: {
        id: "Sweden",
      },
    },
  ];

  return {
    paths,
    fallback: false,
  };
}

export default function Country(pageProps) {
  // console.group(citiesData);
  //console.log("CountriesX");

  return (
    <Layout>
      {pageProps.test}
      {pageProps.citiesData.data.cities.map((c) => (
        <p key={c.name}> {c.name} </p>
      ))}
      <br />
    </Layout>
  );
}
