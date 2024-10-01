import fetch from "node-fetch";

export async function graphqlQuery(query) {
  const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data.data; // Adjust if needed
}
