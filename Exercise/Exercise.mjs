import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import path from 'path';
import cors from 'cors';
const fetch = await import('node-fetch').then((module) => module.default);

const app = express();
const PORT = 80;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json({ limit: '100mb' }));
app.use(cors({
  origin: `http://localhost`,
  credentials: true,
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/allContacts', (req, res) => {
  res.render('allContacts');
});

app.get('/addNew', (req, res) => {
  res.render('addNew');
});

app.post('/api/addContact', async (req, res) => {
  const requestBody = req.body;

  try {
    const response = await fetch('https://u-topic-0-383623.uc.r.appspot.com/addContact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).send(response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

app.get('/allContacts', async (req, res) => {
  console.log("ROTA ACEDIDA")
  try {
    const response = await fetch('https://u-topic-0-383623.uc.r.appspot.com/allContacts');
    const contacts = await response.json();
    console.log("CONTACTOS====>"+contacts);
    res.render('allContacts', { contacts });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to fetch contacts.');
  }
});


app.get('/contact/:contactId', (req, res) => {
  const contactId = req.params.contactId;
  res.render('contactDetails', { contactId });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
