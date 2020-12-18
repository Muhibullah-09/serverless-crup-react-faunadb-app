import React, { useState, useEffect } from 'react';
import { Paper, Grid, Button, TextField, makeStyles, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import Navigation from './components/Navigation';
import { getAllExpenses, createExpenseItem, deleteExpenseItem } from './api';

const useStyles = makeStyles({
  root: {
    marginTop: 80,
    margin: 20,
    flexGrow: 1
  },
  list: {
    marginTop: 20
  }

});


function App() {
  const classes = useStyles();
  const [expenseDetail, setExpenseDetail] = useState('');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getAllExpenses.then(res => {
      setExpenses(res);
      console.log(res);
    });
  }, []);
  function handleExpenseDetailChange(event) {
    console.log(event.target.value);
    setExpenseDetail(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    createExpenseItem(expenseDetail).then(res => {
      alert('Data added to the database and want to see data on UI reload the page.');
    });
    resetInputField();
  }
  function resetInputField() {
    setExpenseDetail('');
  }
  function handleDeleteItem(event, id) {
    event.preventDefault();
    deleteExpenseItem(id).then(res => res);
    const newExpenses = expenses.filter(expense => expense.ref.id !== id);
    setExpenses(newExpenses);
    alert('Want to remove data ,click OK!');
  }
  return (
    <>
      <Navigation title="Serverless CRUD app" />
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ margin: 16, padding: 16 }}>
            <Grid container>
              <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
                <TextField
                  type="text"
                  name={expenseDetail}
                  value={expenseDetail}
                  placeholder="Enter data here"
                  fullWidth
                  onChange={handleExpenseDetailChange}
                />
              </Grid>
              <Grid xs={2} md={1} item>
                <Button
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  onClick={handleSubmit}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5} className={classes.list}>
          {expenses &&
            expenses.map(expense => (
              <div key={expense.ref.id}>
                <Paper style={{ margin: 16 }}>
                  <List style={{ overflow: 'scroll' }}>
                    <ListItem>
                      <ListItemText primary={expense.data.name} />
                      <ListItemSecondaryAction>
                        <Button
                          color="primary"
                          onClick={event => handleDeleteItem(event, expense.ref.id)}>
                          Delete
                        </Button>
                        <Button color="primary">
                          Update
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Paper>
              </div>
            ))}
        </Grid>
      </Grid>
    </>
  );
}
export default App;