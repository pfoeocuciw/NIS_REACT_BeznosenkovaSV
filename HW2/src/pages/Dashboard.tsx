import { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    Skeleton,
    Typography,
} from '@mui/material';
import petsData from '../data/pets.json';
import { Pet } from '../components/PetCard/types';
import { PetCard } from '../components/PetCard/PetCard';
import { EventLog } from '../components/EventLog/EventLog';

export const Dashboard = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [speciesFilter, setSpeciesFilter] = useState<string>('all');
    const [logOpen, setLogOpen] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        const timerId = window.setTimeout(() => {
            setPets(petsData as Pet[]);
            setLoading(false);
        }, 1000);

        return () => window.clearTimeout(timerId);
    }, []);

    const handleSpeciesChange = (event: SelectChangeEvent<string>) => {
        setSpeciesFilter(event.target.value);
    };

    const uniqueSpecies = useMemo(() => {
        const set = new Set<string>();
        pets.forEach(p => set.add(p.species));
        return Array.from(set);
    }, [pets]);

    const filteredPets = useMemo(() => {
        if (speciesFilter === 'all') {
            return pets;
        }
        return pets.filter(pet => pet.species === speciesFilter);
    }, [pets, speciesFilter]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                    gap: 2,
                    flexWrap: 'wrap',
                }}
            >
                <Box>
                    <Typography variant="h5" gutterBottom>
                        CyberZoo Dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Monitor and control your cyber-pets in real time.
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                        <InputLabel id="species-filter-label">Species</InputLabel>
                        <Select
                            labelId="species-filter-label"
                            label="Species"
                            value={speciesFilter}
                            onChange={handleSpeciesChange}
                        >
                            <MenuItem value="all">All species</MenuItem>
                            {uniqueSpecies.map(species => (
                                <MenuItem key={species} value={species}>
                                    {species}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setLogOpen(true)}
                    >
                        Open event log
                    </Button>
                </Box>
            </Box>

            {}
            {loading ? (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, minmax(0, 1fr))',
                            md: 'repeat(4, minmax(0, 1fr))',
                        },
                        gap: 2,
                    }}
                >
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            height={180}
                            animation="wave"
                            sx={{ borderRadius: 2 }}
                        />
                    ))}
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, minmax(0, 1fr))',
                            md: 'repeat(4, minmax(0, 1fr))',
                        },
                        gap: 2,
                    }}
                >
                    {filteredPets.map(pet => (
                        <Box key={pet.id}>
                            <PetCard pet={pet} />
                        </Box>
                    ))}
                </Box>
            )}

            <EventLog open={logOpen} onClose={() => setLogOpen(false)} />
        </>
    );
};
