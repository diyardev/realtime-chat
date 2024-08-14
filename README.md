# Real-Time Chat Application 
[Live Demo](https://chat.diyar.net.tr)

This is a real-time chat application built with Next.js, Supabase, TypeScript, NextUI, Tailwind CSS, and Framer Motion. The application provides a seamless and interactive chat experience with several advanced features.



## Features

- **Swipe-to-Reply:** Users can reply to messages by simply swiping the message to the right.
- **Notification Sounds:** 
  - A sound notification is triggered when a new message is received.
  - A different sound plays when a message is sent.
- **Message Filtering:**
  - Profanity is automatically detected and blocked.
  - Empty messages are prevented from being sent.
- **Real-Time Communication:** Messages are delivered instantly, ensuring a smooth and responsive chat experience.

## Tech Stack

- **Next.js**: Framework for building the user interface.
- **Supabase**: Backend-as-a-Service providing real-time database functionality.
- **TypeScript**: Strongly-typed programming language for building reliable code.
- **NextUI**: UI components for building modern and accessible interfaces.
- **Tailwind CSS**: Utility-first CSS framework for custom styling.
- **Framer Motion**: Library for creating animations and transitions.

## Getting Started

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository and Install Dependencies

First, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/diyardev/realtime-chat.git
cd realtime-chat
npm install
```

### 2. Create Database Tables in Supabase

Log in to your [Supabase](https://supabase.com/) dashboard and run the following SQL script to create the necessary database tables:

```sql
CREATE TABLE
  ip_names (
    id SERIAL PRIMARY KEY,
    ip VARCHAR(45) UNIQUE,
    name VARCHAR(255)
  );

CREATE TABLE
  messages (
    id SERIAL PRIMARY KEY,
    content TEXT,
    ip VARCHAR(45),
    reply_id BIGINT,
    reply_msg VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ip) REFERENCES ip_names (ip)
  );
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

You can retrieve these values from your Supabase dashboard. If they don't appear immediately after creating your database, you can find them under **Project Settings > API**.

### 4. Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue for any bugs or feature requests.

## License

This project is licensed under the MIT License.
```
