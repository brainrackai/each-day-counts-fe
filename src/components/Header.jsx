import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  Spacer,
  Icon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FiLogOut, FiCalendar, FiUsers } from 'react-icons/fi';

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  
  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <Box 
      bg="white"
      px={8} 
      py={4} 
      boxShadow="lg"
      position="sticky"
      top={0}
      zIndex={1000}
      transition="all 0.2s"
      _hover={{ boxShadow: 'xl' }}
    >
      <Flex 
        maxW="container.xl" 
        mx="auto" 
        align="center"
      >
        <HStack 
          spacing={2}
          cursor="pointer"
          onClick={() => navigate('/dashboard')}
          _hover={{ transform: 'scale(1.02)' }}
          transition="all 0.2s"
        >
          <Icon 
            as={FiCalendar} 
            boxSize={8} 
            color="blue.500"
          />
          <Text 
            fontSize="2xl" 
            fontWeight="bold" 
            color="blue.500"
            letterSpacing="tight"
          >
            Each Day Counts
          </Text>
        </HStack>
        <Spacer />
        <HStack spacing={6}>
          <Text 
            color="gray.600"
            fontSize="lg"
            fontWeight="medium"
            transition="all 0.2s"
            _hover={{ color: 'blue.500' }}
          >
            Hi,{' '}
            <Text 
              as="span" 
              color="blue.500"
              fontWeight="semibold"
            >
              {user?.email || 'User'}
            </Text>
            !
          </Text>
          {user?.role === 'ADMIN' && (
            <Button
              p={2}
              minW="auto"
              variant="ghost"
              color="blue.500"
              onClick={() => navigate('/users')}
              _hover={{
                color: 'blue.500',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            >
              <Icon as={FiUsers} boxSize={5} />
            </Button>
          )}
          <Button
            variant="ghost"
            p={2}
            minW="auto"
            color="blue.500"
            _hover={{
              color: 'blue.500',
              transform: 'translateY(-2px)',
            }}
            transition="all 0.2s"
            onClick={handleLogout}
          >
            <Icon as={FiLogOut} boxSize={5} />
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header; 