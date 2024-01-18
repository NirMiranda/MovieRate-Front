import { movie } from "../../pages/MoviesPage/MoviesPage";
import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export type m = {
    data: movie
}

function MovieLogo({ data }: m) {
    return (
        <Box
        component="ul"
        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
        className="movieLogo"
      >
        <Card component="li" sx={{ width:210,height:350,marginRight:1,flexGrow: 1 }}>
          <CardCover>
            <img
              src= {data?.image}
              srcSet={data?.image}
              loading="lazy"
              alt=""
            />
          </CardCover>
          <CardContent>
            <Typography
              level="body-lg"
              fontWeight="lg"
              textColor="#fff"
              mt={{ xs: 12, sm: 18 }}
            >
            </Typography>
          </CardContent>
        </Card>
    </Box>
    );
}
export default MovieLogo;
