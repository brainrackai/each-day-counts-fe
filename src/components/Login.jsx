import React, { useState } from 'react';
import {
  Button,
  Container,
  Input,
  Heading,
  Text,
  Alert,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useFetcher } from '../hooks/useFetcher';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const { setUser } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetcher({
        path: '/auth/login',
        method: 'POST',
        payload: formData
      });
      const {data = {}} = response || {}
      setUser({ email: formData.email, role: data.role });
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" py="10">
      <VStack spacing="6" width="100%">
        <Heading size="lg">Login</Heading>
        {error}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing="4" width="100%">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              size="md"
            />

            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              size="md"
            />

            <Button
              type="submit"
              variant="solid"
              width="100%"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </VStack>
        </form>

        <Text>
          Don't have an account?{' '}
          <ChakraLink as={Link} to="/register" color="blue">
            Register here
          </ChakraLink>
        </Text>
      </VStack>
    </Container>
  );
};

export default Login; 