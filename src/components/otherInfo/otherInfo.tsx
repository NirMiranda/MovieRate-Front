import React from 'react';
import Chip from '@mui/material/Chip';
import { Stack } from '@mui/material';

interface OtherInfoProps {
  description?: string; 
  genre?: string; 
  year?: number;
  director?: string;
  actors?: string[];
  ratingImdb?: number;
}

const OtherInfo: React.FC<OtherInfoProps> = ({
  genre,
  description,
  year,
  director,
  actors,
  ratingImdb,
}) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Stack direction="row" spacing={1} style={{ justifyContent: 'center', margin: '10px 0 10px 0' }}>
        <Chip label="Plot" style={{ color: 'white' }} /><Chip label={description} variant="outlined" style={{ color: 'LightGray' }} />
      </Stack>
      <Stack direction="row" spacing={1} style={{ justifyContent: 'center', margin: '10px 0 10px 0' }}>
        <Chip label="IMDB Rating" style={{ color: 'white' }} /><Chip label={ratingImdb} variant="outlined" style={{ color: 'LightGray' }} />
        <Chip label="Genre" style={{ color: 'white' }} /><Chip label={genre} variant="outlined" style={{ color: 'LightGray' }} />
        <Chip label="Year" style={{ color: 'white' }} /><Chip label={year} variant="outlined" style={{ color: 'LightGray' }} />
      </Stack>
      <Stack direction="row" spacing={1} style={{ justifyContent: 'center', margin: '10px 0 10px 0' }}>
        {/* Display Director */}
        <Chip label="Director" style={{ color: 'white' }} /><Chip label={director} variant="outlined" style={{ color: 'LightGray' }} />
      </Stack>
      <Stack direction="row" spacing={1} style={{ justifyContent: 'center', margin: '10px 0 10px 0' }}>
        {/* Display Actors */}
        <Chip label="Actors" style={{ color: 'white' }} />
        {actors && actors.map((actor, index) => (
          <Chip key={index} label={actor} variant="outlined" style={{ color: 'LightGray' }} />
        ))}
      </Stack>
    </div>
  );
};

export default OtherInfo;
