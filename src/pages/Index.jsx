import { useState } from 'react';
import { Container, Text, VStack, Input, Button, Box, Spinner } from "@chakra-ui/react";

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) {
        setResponse(`Error: ${data.error}`);
      } else {
        setResponse(data.response);
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">AI Tool for Students</Text>
        <Input 
          placeholder="Enter your text here..." 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
        />
        <Button onClick={handleSubmit} isLoading={loading} colorScheme="teal">Generate</Button>
        {loading && <Spinner />}
        {response && (
          <Box p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Text>{response}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;