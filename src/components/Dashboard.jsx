import React from 'react';
import {
    Box,
    Container,
    Grid,
    Heading,
    Card,
    CardBody,
    Text,
    HStack,
    VStack,
    Icon,
    Progress,
    Circle,
} from '@chakra-ui/react';
import {
    FiUsers,
    FiTrendingUp,
    FiCalendar,
    FiCheckCircle,
    FiSmile,
} from 'react-icons/fi';
import { useUser } from '../context/UserContext';
import Header from './Header';

const StatCard = ({ label, value, icon, helpText }) => (

    <HStack spacing={4}>
        <Box p={3} bg="blue.50" borderRadius="lg">
            <Icon as={icon} boxSize={6} color="blue.500" />
        </Box>
        <VStack align="start" spacing={1}>
            <Text color="gray.500" fontSize="sm">{label}</Text>
            <Text fontSize="2xl" fontWeight="bold">{value}</Text>
            {helpText && <Text color="green.500" fontSize="sm">{helpText}</Text>}
        </VStack>
    </HStack>

);

const ProgressBar = ({ value }) => (
    <Box
        w="100%"
        h="8px"
        bg="gray.100"
        borderRadius="full"
        overflow="hidden"
    >
        <Box
            h="100%"
            bg="blue.500"
            borderRadius="full"
            transition="width 0.3s ease-in-out"
            w={`${value}%`}
        />
    </Box>
);

const ProgressCircle = () => (
    <VStack spacing={4} align="start" py={4}>
        <Circle
            size="200px"
            bg="blue.50"
            position="relative"
            _before={{
                content: '""',
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: `conic-gradient(#3182CE ${75}%, #EDF2F7 0)`,
            }}
        >
            <Circle
                size="180px"
                bg="white"
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Icon
                    as={FiSmile}
                    boxSize={20}
                    color="blue.500"
                    transform="scale(1.2)"
                />
            </Circle>
        </Circle>
    </VStack>
);

const Dashboard = () => {
    const { user } = useUser();

    return (
        <>
            <Header />
            <Container maxW="container.xl" py={8}>
                <VStack spacing={8} align="stretch">
                    <Heading size="lg">Dashboard</Heading>

                    <Box>
                        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
                            <StatCard
                                label="Total Users"
                                value="1,234"
                                icon={FiUsers}
                                helpText="+12% this month"
                            />
                            <StatCard
                                label="Revenue"
                                value="$12,345"
                                icon={FiTrendingUp}
                                helpText="+8% this month"
                            />
                            <StatCard
                                label="Active Projects"
                                value="45"
                                icon={FiCalendar}
                            />
                            <StatCard
                                label="Completed Tasks"
                                value="89%"
                                icon={FiCheckCircle}
                            />
                        </Grid>
                    </Box>

                    <VStack spacing={4} align="stretch">
                        <Heading size="md">Current Progress</Heading>
                        <HStack align="start" spacing={8} gap={16} alignItems={"center"}>
                            <ProgressCircle />
                            <VStack align="stretch" spacing={4} flex={1} w={'full'}>
                                <Box>
                                    <HStack justify="space-between" mb={2}>
                                        <Text>Project A</Text>
                                        <Text>75%</Text>
                                    </HStack>
                                    <ProgressBar value={75} />
                                </Box>
                                <Box>
                                    <HStack justify="space-between" mb={2}>
                                        <Text>Project B</Text>
                                        <Text>45%</Text>
                                    </HStack>
                                    <ProgressBar value={45} />
                                </Box>
                                <Box>
                                    <HStack justify="space-between" mb={2}>
                                        <Text>Project C</Text>
                                        <Text>90%</Text>
                                    </HStack>
                                    <ProgressBar value={90} />
                                </Box>
                            </VStack>
                        </HStack>
                    </VStack>
                </VStack>
            </Container>
        </>
    );
};

export default Dashboard; 