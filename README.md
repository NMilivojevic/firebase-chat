# Firebase chat

-   TypeScript: for static typing
-   React: framework of choice
-   Vite: development environment
-   Sass: styling
-   ContextApi: state management
-   ESLint: linting
-   Firebase: Auth, data storage, chat integration

**Firebase flow**

-   Firebase authentication with email and password.
-   Firebase

**ContextAPI state**

-   AuthContext: Manages user authentication and provides real-time user data. It includes states for `currentUser` and `isLoading`.
-   ChatContext: manages chat state and user data. It includes a `chat` state with a `chatId` and `user` information, allowing for user changes through a `reducer`.

**Pages**

-   Register: Uses Firebase's `createUserWithEmailAndPassword`. If the registration is successful, it updates the user's display name and adds their information to the Firestore database. However, if there are any errors during registration (e.g., email already in use or weak password), an error message is displayed briefly.
-   Login: Uses firebase's `signInWithEmailAndPassword` for authentication. If there are any authentication errors (e.g., invalid login credentials), an error message is displayed briefly.

**Components**

-   Contains reusable UI components.
-   Chats: listens for changes in the user's chat data in Firebase Firestore and displays a list of chat conversations. When a chat conversation is selected, it updates the chat user's information through the `ChatContext`.
-   Messages: listens for changes in the chat messages associated with the current chat conversation in Firebase Firestore and displays a list of these messages. It fetches and displays messages dynamically as they are added or updated in the Firestore document.
