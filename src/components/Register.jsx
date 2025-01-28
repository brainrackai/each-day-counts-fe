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

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fetcher = useFetcher();

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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await fetcher({
        path: '/auth/register',
        method: 'POST',
        payload: {
          email: formData.email,
          password: formData.password
        }
      });

      navigate('/login');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" py="10">
      <VStack spacing="6" width="100%">
        <Heading size="lg">Register</Heading>
        {error && <Text status="error">{error}</Text>}

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

            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
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
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </VStack>
        </form>

        <Text>
          Already have an account?{' '}
          <ChakraLink as={Link} to="/login" color="blue">
            Login here
          </ChakraLink>
        </Text>
      </VStack>
    </Container>
  );
};

export default Register; 