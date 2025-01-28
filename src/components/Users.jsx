import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    HStack,
    TableRoot,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableColumnHeader,
} from '@chakra-ui/react';
import { useFetcher } from '../hooks/useFetcher';
import Header from './Header';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const fetcher = useFetcher();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetcher({
                    path: '/auth/users',
                    method: 'GET'
                });
                const { data = [] } = response || {}
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <>
                <Header />
                <Container maxW="container.xl" py={8}>
                    <HStack justify="center" py={10}>
                        <Text>Loading...</Text>
                    </HStack>
                </Container>
            </>
        );
    }

    return (
        <>
            <Header />
            <Container maxW="container.xl" py={8}>
                <Box>
                    <Heading size="lg" mb={6}>Users</Heading>
                    {error ? (
                        <Text color="red.500">{error}</Text>
                    ) : (
                        <Box overflowX="auto">
                            <TableRoot>
                                <TableHeader>
                                    <TableRow>
                                        <TableColumnHeader>Email</TableColumnHeader>
                                        <TableColumnHeader>Role</TableColumnHeader>
                                        <TableColumnHeader>Created At</TableColumnHeader>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Text
                                                    color={user.role === 'ADMIN' ? 'blue.500' : 'gray.600'}
                                                    fontWeight={user.role === 'ADMIN' ? 'semibold' : 'normal'}
                                                >
                                                    {user.role}
                                                </Text>
                                            </TableCell>
                                            <TableCell>{formatDate(user.createdAt)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </TableRoot>
                        </Box>
                    )}
                </Box>
            </Container>
        </>
    );
};

export default Users; 