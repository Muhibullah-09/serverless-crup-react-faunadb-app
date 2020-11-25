import faunadb from 'faunadb';
const client = new faunadb.Client({
  secret: "fnAD7eIAhLACB5tqkK4CwN6aEseZu46dLf_j4Tn_"
});
const q = faunadb.query;
export { client, q };