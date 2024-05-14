Costruisco 2 classi in Vanilla JS:
- Contact che ha in sé le informazioni di ciacun contatto (nome, telefono e email).
- PhoneAgenda che esegue procedure su una mappa (complessità in tempo costante O(1) in ricerca).

Il programma dovrà eseguirsi in locale:

- Dovendo gestire pochi dati persistenti, non avendo a disposizione Node.js e quindi il modulo di file System (fs) ed essendo il browser limitato ad accedere ai file locali per questioni di privacy e sicurezza, una soluzione è quella di usare il local storage del browser:

"Il local storage è una funzionalità fornita dai browser web che consente agli sviluppatori di archiviare dati in modo persistente sul lato client. Questi dati rimangono memorizzati anche dopo la chiusura del browser e consentono di salvare informazioni come preferenze dell'utente, stato dell'applicazione, dati di login, e altro ancora."

- Volendo poi pensare a degli sviluppi futuri, ho pensato di dare la possibilità di scaricare direttamente i dati su un documento JSON utilizzando un oggetto Blob

"Un oggetto Blob (Binary Large Object) è un tipo di oggetto utilizzato per rappresentare dati binari di grandi dimensioni, come ad esempio file multimediali (immagini, video, audio) o file di testo. I Blob sono comunemente utilizzati in ambienti web per gestire e manipolare dati binari in modo efficiente. Ad esempio, un'immagine caricata da un utente potrebbe essere rappresentata come un oggetto Blob prima di essere salvata o elaborata."