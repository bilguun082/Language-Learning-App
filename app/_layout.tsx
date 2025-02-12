import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ClerkProvider } from '@clerk/clerk-expo';
import { Slot } from 'expo-router';
import React from 'react';

const RootLayoutNav: React.FC = () => {
  const client = new ApolloClient({
    uri: 'https://app-backend-mauve.vercel.app/api/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ClerkProvider publishableKey={`${process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}`}>
        <Slot />
      </ClerkProvider>
    </ApolloProvider>
  );
};

export default RootLayoutNav;
