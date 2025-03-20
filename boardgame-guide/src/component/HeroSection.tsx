import { Button, Container, Typography, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import Image from "next/image";

export default function HeroSection() {
    return (
        <Box
            component="section"
            sx={{
                minHeight: "100vh",
                pt: 8,
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(to bottom, #ffffff, rgba(25, 118, 210, 0.05), #ffffff)"
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center">
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Box>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    fontWeight: 800,
                                    mb: 3,
                                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent'
                                }}
                            >
                                Play Board Games Online
                            </Typography>
                            <Typography
                                variant="h5"
                                color="text.secondary"
                                sx={{ mb: 4 }}
                            >
                                Experience the thrill of classic board games in a modern digital format. Play with friends or challenge players worldwide.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    endIcon={<ChevronRightIcon />}
                                >
                                    Start Playing
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                >
                                    Learn More
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{
                            position: 'relative',
                            borderRadius: 2,
                            overflow: 'hidden',
                            aspectRatio: '1/1'
                        }}>
                            <Image src="/photo-1496449903678-68ddcb189a24.jpg"
                                   alt="People playing board games"
                                   fill
                                   sizes={"100%"}/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}