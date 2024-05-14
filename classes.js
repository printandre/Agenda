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
            agendaString += `<p>Name: ${contact.name}, Phone: ${contact.phoneNumber}, Email: ${contact.email}</p>`;
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