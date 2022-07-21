import React, { useEffect, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { useForm } from 'react-hook-form';

const client = new GraphQLClient('/graphql');

const GetMessages = gql`
  query GetMessages {
    messages {
      id
      text
    }
  }
`;

const CreateMessage = gql`
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      success
    }
  }
`;

const getMessages = async () => {
  client.request(GetMessages).then(response => {
    console.log(response);
  });
};

interface Message {
  id: string;
  text: string;
}

interface FormValues {
  text: string;
}

export const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { handleSubmit, register } = useForm<FormValues>();

  useEffect(() => {
    client.request(GetMessages).then((response) => {
      setMessages(response.messages);
    });
  }, []);

  const createMessage = (values: FormValues) => {
    const id = crypto.randomUUID();
    const input = { id, ...values };

    client.request(CreateMessage, { input }).then((response) => {
      console.log(response.createMessage.success);
    });
  };

  return (
    <>
      <header></header>
      <main>
        <h1>Hello, World</h1>
        <form onSubmit={handleSubmit(createMessage)}>
          <label htmlFor="text-input">Text</label>
          <input id="text-input" {...register('text')} />
          <button>Submit</button>
        </form>
        <section>
          <ul>
            {messages.map(message => <li key={message.id}>{message.text}</li>)}
          </ul>
        </section>
      </main>
      <footer></footer>
    </>
  );
};
