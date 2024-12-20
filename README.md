# WhatsApp Clone

A modern WhatsApp clone built using **React**, **Tailwind CSS**, and **Firebase** to replicate the core features of WhatsApp's user interface and functionality. This project demonstrates a real-time messaging application with a sleek design and robust backend integration.

---

## Features

- **Real-Time Messaging**: Send and receive messages instantly using Firebase's real-time database.
- **Authentication**: User authentication via Firebase Authentication (e.g., email/password, Google Sign-In).
- **Responsive Design**: Fully responsive UI using Tailwind CSS.
- **Chat Groups and Direct Messaging**: Support for group chats and one-on-one conversations.
- **Message Timestamps**: Display when messages were sent.
- **User Status**: Show user presence (online/offline).
- **Media Sharing**: User profile customization
- **Search Functionality**: Search through chat history or contacts.

---

## Tech Stack

### Frontend
- **React**: Component-based UI development.
- **Tailwind CSS**: Styling for modern, responsive design.
- **Lucide Icons**: For lightweight and customizable icons.
- **React Router DOM**: For managing navigation and routes.

### Backend
- **Firebase Firestore**: For storing chat messages and user data.
- **Firebase Authentication**: For secure user authentication.
- **Firebase Hosting**: For deploying the application.

---

## Installation

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js and npm installed on your machine.
- A Firebase account with a project set up.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/whatsapp-clone.git
   cd whatsapp-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Go to your Firebase console.
   - Create a new project and set up Firestore and Authentication.
   - Get your Firebase config and update the `.env` file in the project:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.


## Deployment

To deploy the project on Firebase Hosting: https://wa-clone-6c198.web.app/

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Log in to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Deploy to Firebase Hosting:
   ```bash
   firebase deploy
   ```

---

## Future Improvements

- Theme changer Dark mode
- Include media sharing functionality.
- Improve user profile customization.

---

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Router DOM](https://reactrouter.com/)

---

## Author

**Pritam Ghosh**  
Feel free to connect with me on [GitHub](https://github.com/Pritam-Ghosh)!
