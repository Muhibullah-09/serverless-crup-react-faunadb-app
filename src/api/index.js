import { client, q } from '../config/db';

// To query the list of expenses in the database collection,
// you need to use the all_expenses index. The query below 
// is going to return a ref that can be mapped over to get
// the results. Make sure to add the catch such that if 
// there is an error while running the query, it can be logged out:

export const getAllExpenses = client.query(q.Paginate(q.Match(q.Ref('indexes/crud_data'))))
    .then(response => {
        const expenseRef = response.data;
        const getAllDataQuery = expenseRef.map(ref => {
            return q.Get(ref);
        });
        return client.query(getAllDataQuery).then(data => data);
    })
    .catch(error => console.error('Error: ', error.message));

// The next query is to create a new item (document) in the crud collection:
export const createExpenseItem = name =>
    client.query(q.Create(q.Collection('crud'), {
        data: {
            name
        }
    }))
    .then(ret => ret)
    .catch(error => console.error('Error: ', error.message));

// To delete an item from the database collection, all 
// you have to do is refer to the expense ID you want to delete:

export const deleteExpenseItem = expenseId =>
    client.query(q.Delete(q.Ref(q.Collection('crud'), expenseId)))
        .then(ret => ret)
        .catch(error => console.error('Error: ', error.message));