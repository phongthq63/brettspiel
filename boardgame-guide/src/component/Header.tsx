import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';

export default function Header() {
    return (
        <AppBar position="fixed" color="inherit" sx={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}>
            <Container maxWidth="lg">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{
                            width: 32,
                            height: 32,
                            bgcolor: 'primary.main',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold' }}>
                                BG
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            BoardGame
                        </Typography>
                    </Box>

                    {/* Navigation */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                        <Button color="inherit" href="#games">Games</Button>
                        <Button color="inherit" href="#features">Features</Button>
                        <Button color="inherit" href="#contact">Contact</Button>
                    </Box>

                    {/* Actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            variant="contained"
                            size="small"
                            endIcon={<ChevronRightIcon />}
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                            Start Playing
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}