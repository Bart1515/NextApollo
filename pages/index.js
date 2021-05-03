import Head from "next/head";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import React from "react";
import { initializeApollo, addApolloState } from "../lib/apolloClient";

const ALL_COUNTRIES = gql`
  {
    countries {
      name
      cities {
        name
      }
    }
  }
`;

export async function getStaticProps() {
  const client = initializeApollo();

  const allCountriesData = await client.query({
    query: ALL_COUNTRIES,
  });
  return {
    props: {
      allCountriesData,
    },
  };
}

export default function Home(props) {
  //console.log("test: " + JSON.stringify(props));
  return (
    <div className={styles.container}>
      {props.allCountriesData.data.countries.map((country) => (
        <div key={country.name}>
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
}

// const Hello = () => {
//   return <div>tja</div>;
// };

// export default function Home({ allCountriesData }) {
//   return (
//     <div className={styles.container}>
//       <Hello />
//       Hej
//       <App />
//       <main className={styles.main}></main>
//     </div>
//   );
// }

// function App() {
//   const { loading, error, data } = useQuery(EXCHANGE_RATES);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return data.countries.map((country) => (
//     <div key={country.name}>
//       <p>{country.name}</p>
//     </div>
//   ));
// }

// const Hello = () => {
//   return <div>tja</div>;
// };

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Hello />
//       Hej
//       <ApolloProvider client={client}>
//         <App />
//       </ApolloProvider>
//       <main className={styles.main}></main>
//     </div>
//   );
// }
