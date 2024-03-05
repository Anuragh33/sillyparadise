import supabase from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}

export async function insertCabin(newCabin) {
  //imgaeURl : https://iiimsgqnuumjbybcremo.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const { data, error } = await supabase
    .from('cabins')
    .insert([newCabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  return data;
}
