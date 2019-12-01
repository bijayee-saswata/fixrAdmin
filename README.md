# Fixr

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Project Structure

* [x] Generate vue app.
* [x] Create firbase project.
 * [] Set strict rules.
* [x] Add firebase configue file.
* [x] Add Vuexfire for realtime cloud firestore database.
 * [x] (https://github.com/vuejs/vuefire)
* [x] Add firebase authentication with email & pass.
 * [] Save user data to vuex store.
* [x] Fetch data from firestore.
 * [x] Add them to vuex store.
* [x] Create NavAdmin page the main layout page.
 * [x] Add router view.
  * [x] Set navguard.
 * [x] Fetch no. of pending orders and feedbacks.
 * [x] Add logout.
  * [] Clear state datas.
  * [x] redirect to login page.
* [x] Create dashboard page.
 * [] Fetch the number of users, services, transactions.
 * [] Add list of admins.
 * [] Plot the graph transaction vs month.
 * [] graph for most popular services.
* [x] Create users page
 * [x] Fetch the users list.
 * [] Display 20 user per page.
 * [x] Add search bar to search a perticular user.
 * [x] Delete button to delete a user.
* [x] Create feedback page.
 * [x] Fetch the list
 * []  Display 20 list per page.
 * [x] Reply button to send a response.
* [x] Create transactions page
 * [x] Fetch the transaction.
 * [] Display 20 list per page.
 * [x] Search bar to search a transaction.
 * [] Read only view.
* [x] Create pending order page
 * [x] Fetch the pending orders.
 * [] Display 20 list per page.
 * [x] Create accept and reject buttton.
 * [x] Create accept ad reject form.
 * [x] Update the database.
 
 ## Resources
 * [] (https://angularfirebase.com/tag/firestore/)
  
