// ReviewTable.tsx
import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin-top: 20px;
  margin-left: 10px; /* Adjusted margin-left */
  overflow-x: auto; /* Added overflow for small screens */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  color: black;
`;

const TableHeader = styled.th`
  padding: 8px;
  background-color: #f2f2f2;
`;

const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 100%; /* Make cells circular */
`;

const TableTitle = styled.h2`
  margin-top: 10px;
`;

const ReviewTable = () => {
  return (
    <TableContainer>
      <TableTitle>My Reviews</TableTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>Title</TableHeader>
            <TableHeader>Rating</TableHeader>
            <TableHeader>Comment</TableHeader>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell>Movie 1</TableCell>
            <TableCell>4.5</TableCell>
            <TableCell>Great film!</TableCell>
          </tr>
          <tr>
            <TableCell>Movie 2</TableCell>
            <TableCell>3.8</TableCell>
            <TableCell>Interesting plot.</TableCell>
          </tr>
          <tr>
            <TableCell>Movie 3</TableCell>
            <TableCell>5.0</TableCell>
            <TableCell>Masterpiece!</TableCell>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default ReviewTable;
