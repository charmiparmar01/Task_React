import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useGetCategoriesQuery } from '../services/api';

type RawCategory = string | { slug?: string; name?: string; [k: string]: any };

const normalize = (c: RawCategory) => {
  if (typeof c === 'string') return { id: c, label: c };
  const id = String(c.slug ?? c.name ?? JSON.stringify(c));
  const label = String(c.name ?? c.slug ?? id);
  return { id, label };
};

const CategoryFilter: React.FC<{ value: string | null; onChange: (v: string | null) => void }> = ({ value, onChange }) => {
  const { data: categories } = useGetCategoriesQuery();
  const normalized = (categories ?? []).map((c: RawCategory) => normalize(c));

  return (
    <FormControl fullWidth size="small" sx={{ minWidth: 220 }}>
      <InputLabel id="cat-label">Category</InputLabel>
      <Select
        labelId="cat-label"
        value={value ?? ''}
        label="Category"
        onChange={(e) => onChange(e.target.value ? String(e.target.value) : null)}
      >
        <MenuItem value="">All</MenuItem>
        {normalized.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
