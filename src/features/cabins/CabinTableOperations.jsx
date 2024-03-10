import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField='discount'
        options={[
          { value: 'All', label: 'All' },
          { value: 'No-Discount', label: 'No Discount' },
          { value: 'With-Discount', label: 'With Discount' },
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by Name (A-Z)' },
          { value: 'name-dec', label: 'Sort by Name (Z-A)' },
          { value: 'regularPrice-des', label: 'Sort by Price (High - Low)' },
          { value: 'regularPrice-asc', label: 'Sort by Price (Low - High)' },
          { value: 'maxCapacity-dec', label: 'Sort by Capacity (High - Low)' },
          { value: 'maxCapacity-asc', label: 'Sort by Capacity (Low - High)' },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
