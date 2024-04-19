import { program } from 'commander';
import contactsAPI from './contacts.js';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case 'list':
        // ...
        const contacts = await contactsAPI.listContacts();
        console.table(contacts);

        break;

      case 'get':
        // ... id
        const contact = await contactsAPI.getContactById(id);
        console.log(contact);
        break;

      case 'add':
        // ... name email phone
        const newContact = await contactsAPI.addContact(name, email, phone);
        console.log(newContact);
        break;

      case 'remove':
        // ... id
        const deletedContact = await contactsAPI.removeContact(id);
        console.log(deletedContact);
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  } catch (error) {
    console.error(error);
  }
}

invokeAction(options);
