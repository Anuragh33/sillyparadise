import supabase, { supabaseUrl } from './supabase';

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
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    throw new Error('Cabin could not be created');
  }

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image, {
      cacheControl: '3600',
      upsert: false,
    });

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error(
      `Cabin could not be created as, cabin image not uploaded properly.`
    );
  }

  return data;
}
