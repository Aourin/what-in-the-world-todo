#### What in the World - TODO
Basic todo application utilizing webpack and react for the client side.

**Get it running**

1. Install it with `npm install`

2. Run it with `npm run dev` (uses webpack dev server)

3. Check it in the browser while it runs on `localhost:8080/todos`

**Quick Explanation on how it works.**

- Todos list sits at the `/todos` routes. There should be an empty state that allows
you to add a new detail.

- Clicking the add button will send a request to the server to create a todo and send the
response with the new one

- You should be able to start editing the new Todo list by clicking the `edit` icon by the title or you can
click the `Add Item` button

- To edit an item, simply click the text of the item. This will switch the `InputBuffer`
on which shows as an edit text line

- Hitting `escape` or blurring the focus (clicking away) will cancel the text you entered.
Hitting `enter` will save the changes for that item.

- Click the circle next to the name to mark it as complete, or if it is already complete, unmark it. A
complete task will show as stricken through

- To remove a todo, hover over the Todo item. It will highlight the item and a remove `x` icon will pop up.
Clicking the remove will remove it from the list

- Clicking the `Clear Completed` button will clear all completed todos.

- By default, the todo items are all listed. The top right shows how many are completed and active. Clicking the
left and right arrow will switch through filters (All, Active, Complete) as well as show the counts.

- There is an empty state if one of the filters returns empty (such as having no Active tasks)

- Clicking another Todo in the list on the left will render out that Todo item to be edited.

- The app makes a call on every update of the Todo (to help maintain parity with the SS). This doesn't account for
any locking/other people editing at the same time. Every updating state (pending changes from the server) will show the
`save icon` at the bottom right.

