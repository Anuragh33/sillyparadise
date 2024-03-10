import { useState } from 'react';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams('');

  const sortBy = searchParams.get('SortBy') || '';

  function handleChange(e) {
    searchParams.set('SortBy', e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <div>
      <Select
        value={sortBy}
        options={options}
        type='white'
        onChange={handleChange}
      />
    </div>
  );
}

export default SortBy;
