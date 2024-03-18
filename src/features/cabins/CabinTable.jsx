import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';

import { useSearchParams } from 'react-router-dom';
import { useCabins } from './useCabins';
import Empty from '../../ui/Empty';

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName='Cabins' />;
  //1. FILTER   //////////////////////////////////////

  let filteredCabins;

  const filterValue = searchParams.get('discount') || 'All';

  if (filterValue === 'All') filteredCabins = cabins;

  if (filterValue === 'No-Discount')
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);

  if (filterValue === 'With-Discount')
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

  //2. SORTING   /////////////////////////////////////

  const sortBy = searchParams.get('SortBy') || 'startDate-asc';

  const [fieldName, actionName] = sortBy.split('-');

  const modifier = actionName === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[fieldName] - b[fieldName]) * modifier
  );

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
