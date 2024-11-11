import { createClient } from '@supabase/supabase-js';
export interface DBProduct {
  name: string;
  url: string;
  min_target_price: number;
  max_target_price: number;
  created: string;
}

const supabase = createClient(
  'https://edryohdtfgjbseubhxcx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcnlvaGR0ZmdqYnNldWJoeGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyNjEyMzksImV4cCI6MjA0NjgzNzIzOX0.6fxzzvJKw4zj0LHy8Tb6II5CNwi8ovYStIIffn2mRR8'
);

export const addProduct = async (
  name: string,
  url: string,
  minTargetPrice: number,
  maxTargetPrice: number
) => {
  const { data, error } = await supabase.from('products').insert([
    {
      name,
      url,
      min_target_price: minTargetPrice,
      max_target_price: maxTargetPrice,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchProducts = async (): Promise<DBProduct[]> => {
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    throw new Error(error.message);
  }
  return data as DBProduct[];
};

export const updateProduct = async (
  id: number,
  name: string,
  url: string,
  minTargetPrice: number,
  maxTargetPrice: number
) => {
  const { data, error } = await supabase
    .from('products')
    .update({
      name,
      url,
      min_target_price: minTargetPrice,
      max_target_price: maxTargetPrice,
    })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const deleteProduct = async (id: number) => {
  const { data, error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
