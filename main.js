class Contact {
    constructor(name, phoneNumber, email) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}

class PhoneAgenda {
    constructor() {
        this.contacts = new Map();
    }

    addContact(contact) {
        this.contacts.set(contact.name, contact);
    }

    findContact(name) {
        return this.contacts.get(name);
    }

    removeContact(name) {
        this.contacts.delete(name);
    }
    
    printAgenda() {
        let agendaString = '';
        this.contacts.forEach(contact => {
            agendaString += `<p>Name: ${contact.name}; Phone: ${contact.phoneNumber}; Email: ${contact.email}</p>`;
        });
        return agendaString;
    }    

    loadFromLocalStorage() {
        const data = localStorage.getItem('contacts');
        if (data) {
            const jsonContacts = JSON.parse(data);
            for (let jsonContact of jsonContacts) {
                this.addContact(new Contact(jsonContact.name, jsonContact.phoneNumber, jsonContact.email));
            }
        }
    }

    saveToLocalStorage() {
        const jsonContacts = Array.from(this.contacts.values());
        localStorage.setItem('contacts', JSON.stringify(jsonContacts));
    }

    downloadContacts() {
        const jsonContacts = JSON.stringify(Array.from(this.contacts.values()));
        const blob = new Blob([jsonContacts], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'contacts.json';
        link.click();
    }
}

// clear messages apart from classId
function clearOtherMessages(classId){
    document.querySelectorAll('.message').forEach(message => {
        if (message.id != classId) {
            message.textContent = '';
        }
    })

}

// instantiate PhoneAgenda and load any data from local storage
const agenda = new PhoneAgenda();
agenda.loadFromLocalStorage();

// Add event listeners

// 1. Add contact
document.getElementById('submit').addEventListener('click', function() {
    let name = document.getElementById('name');
    let phoneNumber = document.getElementById('phoneNumber');
    let email = document.getElementById('email');

    // Regular expressions for validation
    let phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const contact = agenda.findContact(name.value);
    if(name.value && phoneNumber.value && email.value) {
        if(phoneRegex.test(phoneNumber.value) && emailRegex.test(email.value)) {
            if(!contact) {
                // if passed validation, add contact and save to local storage 
                const newContact = new Contact(name.value, phoneNumber.value, email.value);
                agenda.addContact(newContact);
                agenda.saveToLocalStorage();
                document.getElementById('addMessage').textContent = 'Contact added successfully!';
            } else {
                document.getElementById('addMessage').textContent = 'Contact already exists';
            }
        } else {
            document.getElementById('addMessage').textContent = 'Invalid phone number or email';
        }
    } else {
        document.getElementById('addMessage').textContent = 'Please fill in all fields';
    }

    // clear input fields and messages
    name.value = '';
    phoneNumber.value = '';
    email.value = '';
    clearOtherMessages('addMessage');
});

// 2. Search contact
document.getElementById('search').addEventListener('click', function() {
    let name = document.getElementById('searchName');
    const message = document.getElementById('searchMessage');
    const contact = agenda.findContact(name.value);

    if (name.value === ''){
        message.textContent = 'please enter a valid name';
    } else{
        message.textContent = contact ? `Name: ${contact.name}, Phone Number: ${contact.phoneNumber}, Email: ${contact.email}` : 'Contact not found';
    }
    
    // clear input fields and messages
    name.value = '';
    clearOtherMessages('searchMessage');
});

// 3. Remove contact
document.getElementById('remove').addEventListener('click', function() {
    let name = document.getElementById('removeName');
    const message = document.getElementById('deleteMessage');

    if(name.value === '') {
        message.textContent = 'please enter a valid name';
    }else{     
        if(agenda.findContact(name.value)) {
            agenda.removeContact(name.value);
            agenda.saveToLocalStorage();
            message.textContent = 'Contact removed successfully!';
        }else {
        message.textContent = 'Contact not found';
        }
    }

    // clear input fields and messages
    name.value = '';
    clearOtherMessages('deleteMessage');
});

// 4. Print the entire agenda
document.getElementById('print').addEventListener('click', function() {
    document.getElementById('printMessage').innerHTML = agenda.contacts.size > 0 ? agenda.printAgenda() : 'The agenda is empty';
    
    // clear input fields and messages
    clearOtherMessages('printMessage');
});

// 5. Download contacts
document.getElementById('download').addEventListener('click', function() {
    if(agenda.contacts.size > 0) {
        agenda.downloadContacts();
        document.getElementById('downloadMessage').textContent = 'Contacts downloaded successfully!';
    }else{
        document.getElementById('downloadMessage').textContent = 'The agenda is empty';
    }  
    
    // clear input fields and messages
    clearOtherMessages('downloadMessage');
});