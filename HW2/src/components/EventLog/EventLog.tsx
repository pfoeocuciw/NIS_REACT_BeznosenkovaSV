import React from 'react';
import {
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEventLog } from '../../hooks/useEventLog';

interface EventLogProps {
    open: boolean;
    onClose: () => void;
}

export const EventLog: React.FC<EventLogProps> = ({ open, onClose }) => {
    const { events, clearEvents } = useEventLog();

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 340,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.default',
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Event Log</Typography>
                    <IconButton size="small" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ px: 2, pb: 1 }}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={clearEvents}
                        fullWidth
                    >
                        Clear log
                    </Button>
                </Box>

                <Box sx={{ flex: 1, overflowY: 'auto', px: 1, pb: 2 }}>
                    {events.length === 0 ? (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ px: 2, pt: 1 }}
                        >
                            No events yet. Interact with pets to generate logs.
                        </Typography>
                    ) : (
                        <List dense>
                            {events.map((event, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={event} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Box>
        </Drawer>
    );
};
