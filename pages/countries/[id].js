import Layout from "../../components/layout";
import { initializeApollo, addApolloState } from "../../lib/apolloClient";
import { gql } from "@apollo/client";

export async function getStaticProps({ params }) {
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
  const ctry = "Albania";
  const citiesData = await client.query({
    query: CITIES_OF_COUNTRY,
    variables: {
      ctry: params.id,
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
  ];

  return {
    paths,
    fallback: false,
  };
}

export default function Post({ citiesData }) {
  console.group(citiesData);
  return (
    <Layout>
      {citiesData.data.cities.map((c) => (
        <p key={c.name}> {c.name} </p>
      ))}
      <br />
    </Layout>
  );
}
