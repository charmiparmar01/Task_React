import React from 'react';
import { Pagination } from '@mui/material';

const PaginationControl: React.FC<{ page: number; count: number; onChange: (p: number) => void }> = ({ page, count, onChange }) => {
  return <Pagination page={page} count={count} onChange={(_, p) => onChange(p)} />;
};

export default PaginationControl;
